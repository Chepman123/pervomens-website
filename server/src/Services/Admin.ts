import { GoogleGenerativeAI } from "@google/generative-ai";
import db from '../db';
const { BskyAgent } = require('@atproto/api');
import * as fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import GameData from "../Interfaces/GameData";
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import * as os from 'os';
import { randomUUID } from 'crypto';

if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
}

async function makeVideoUnique(buffer: Buffer): Promise<Buffer> {
    const tmpDir = os.tmpdir();
    const inputPath = path.join(tmpDir, `in_${Date.now()}_${randomUUID()}.mp4`);
    const outputPath = path.join(tmpDir, `out_${Date.now()}_${randomUUID()}.mp4`);

    fs.writeFileSync(inputPath, buffer);

    await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-c copy',
                `-metadata comment=uid_${randomUUID()}`,
                '-movflags +faststart'
            ])
            .save(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err));
    });

    const result = fs.readFileSync(outputPath);

    fs.unlink(inputPath, () => {});
    fs.unlink(outputPath, () => {});

    return Buffer.from(result); // нормалізує тип Buffer
}

const agent = new BskyAgent({
    service: "https://bsky.social"
});
let isBlueSkyLogged = false;
let loginPromise: Promise<void> | null = null;

async function initBlueSky() {
    if (isBlueSkyLogged) return;
    if (!loginPromise) {
        loginPromise = agent.login({
            identifier: process.env.BS_LOGIN!,
            password: process.env.BS_PASSWORD!
        }).then(() => {
            isBlueSkyLogged = true;
        }).catch((err: any) => {
            loginPromise = null;
            throw err;
        });
    }
    await loginPromise;
}

async function getPdsHost(did: string): Promise<string> {
    const res = await agent.com.atproto.repo.describeRepo({ repo: did });
    const didDoc = res.data.didDoc as any;

    const pdsService = didDoc?.service?.find(
        (s: any) => s.id === '#atproto_pds' || s.type === 'AtprotoPersonalDataServer'
    );

    if (!pdsService?.serviceEndpoint) {
        throw new Error('Не вдалося визначити PDS для акаунта');
    }

    return new URL(pdsService.serviceEndpoint).host;
}

export default class AdminService {

    async News(content: string, title: string, image: string, game: string) {
        const sql: string = "INSERT INTO news(content, game,title, createdat, image) VALUES($1,$2,$3,$4,$5)";
        db.query(sql, [content, game, title, new Date(), image]);
    }

    async Send(post: string, file: string, index: number) {
        //const content: string = await this.Translate(post);

        //await this.SendTelegram(post, index, file);
        //await this.SendDiscord(content, file);
        //await this.SendBlueSky(content, file);
        await this.SendBlueSky(post, file);
    }

    async SendTelegram(content: string, index: number, file?: string) {
        const token = process.env.TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("❌ TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані в .env");
            return;
        }

        try {
            const fileString = file ? String(file).trim() : "";
            const game = GameData[index];

            if (fileString === "") {
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: chatId,
                    text: '<u>' + game.tittle + '</u>' + "\n" +
                        game.tag + "\n\n" +
                        (content) +
                        "\n\n" +
                        `<a href='https://t.me/perv_games'>Pervomens games</a>`,
                    parse_mode: "HTML"
                });
                console.log("✅ Успішно відправлено текст в Telegram!");
                return;
            }

            if (fileString.startsWith('http://') || fileString.startsWith('https://')) {
                const isVideo = /\.(mp4|mov)(\?|$)/i.test(fileString);
                const method = isVideo ? 'sendVideo' : 'sendPhoto';
                const field = isVideo ? 'video' : 'photo';

                await axios.post(`https://api.telegram.org/bot${token}/${method}`, {
                    chat_id: chatId,
                    [field]: fileString,
                    caption: '<u>' + game.tittle + '</u>' + "\n" +
                        game.tag + "\n\n" +
                        (content) +
                        "\n\n" +
                        `<a href='https://t.me/perv_games'>Pervomens games</a>`,
                    parse_mode: "HTML"
                });
                console.log(`✅ Успішно відправлено ${isVideo ? 'відео' : 'фото'} (по URL) в Telegram!`);
                return;
            }

            let buffer: Buffer | null = null;
            let contentType = 'application/octet-stream';
            let ext = 'jpg';

            if (fileString.startsWith('data:')) {
                const matches = fileString.match(/^data:([A-Za-z0-9.+-]+\/[A-Za-z0-9.+-]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    contentType = matches[1];
                    buffer = Buffer.from(matches[2], 'base64');
                    ext = contentType.split('/')[1] || 'jpg';
                    if (ext === 'quicktime') ext = 'mov';
                }
            } else if (fs.existsSync(fileString)) {
                buffer = fs.readFileSync(fileString);
                ext = path.extname(fileString).replace('.', '').toLowerCase() || 'jpg';
                if (ext === 'mp4') contentType = 'video/mp4';
                else if (ext === 'mov') contentType = 'video/quicktime';
                else if (ext === 'png') contentType = 'image/png';
                else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
            } else if (/^[A-Za-z0-9+/=]+$/.test(fileString) && fileString.length > 100) {
                buffer = Buffer.from(fileString, 'base64');
                contentType = 'video/mp4';
                ext = 'mp4';
            }

            if (!buffer) {
                console.warn("⚠️ Не вдалося обробити файл для Telegram, відправляю лише текст:", fileString.slice(0, 60));
                await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: chatId,
                    text: '<u>' + game.tittle + '</u>' + "\n" +
                        game.tag + "\n\n" +
                        (content) +
                        "\n\n" +
                        `<a href='https://t.me/perv_games'>Pervomens games</a>`,
                    parse_mode: "HTML"
                });
                return;
            }

            const isVideo = contentType.startsWith('video/') || ext === 'mp4' || ext === 'mov';
            const method = isVideo ? 'sendVideo' : 'sendPhoto';
            const field = isVideo ? 'video' : 'photo';
            const filename = `media_${Date.now()}.${ext}`;

            const form = new FormData();
            form.append('chat_id', chatId);
            form.append('caption', content);
            form.append('parse_mode', 'HTML');
            form.append(field, buffer, { filename, contentType });

            await axios.post(`https://api.telegram.org/bot${token}/${method}`, form, {
                headers: { ...form.getHeaders() },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            });

            console.log(`✅ Успішно відправлено ${isVideo ? 'відео' : 'фото'} в Telegram!`);
        } catch (err: any) {
            console.error("❌ Telegram error:", err?.response?.data || err.message || err);
        }
    }

    async Translate(message: string): Promise<string> {
        const genAI = new GoogleGenerativeAI(process.env.API!);

        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash"
        });

        for (let i = 0; i < 3; i++) {
            try {
                const result = await model.generateContent(
                    `Переклади на англ + теги:\n\n${message}. Також не додавай точку на кінці і не пиши довгий -. Також надсилай завжди лише одну опцію. І ще це пост до створення гри. Ти маєш урахувати розмір поста і тегів у 300 символів`
                );

                return result.response.text();
            } catch (err: any) {
                console.log(`Attempt ${i + 1} failed`);

                if (i === 2) throw err;

                await new Promise(r => setTimeout(r, 1000 * (i + 1)));
            }
        }
        return '';
    }

    async SendDiscord(content: string, file?: string) {
        const form = new FormData();
        let filename = '';
        let hasFile = false;

        if (file && typeof file === 'string' && file.trim() !== "") {
            let buffer: Buffer | null = null;
            let contentType = 'application/octet-stream';
            let ext = 'jpg';

            if (file.startsWith('http://') || file.startsWith('https://')) {
                const response = await axios.get(file, { responseType: 'arraybuffer' });
                buffer = Buffer.from(response.data);
                contentType = String(response.headers['content-type'] ?? '');
                if (contentType.includes('video/mp4') || file.includes('.mp4')) ext = 'mp4';
                else if (contentType.includes('video/quicktime') || file.includes('.mov')) ext = 'mov';
                else if (contentType.includes('image/png') || file.includes('.png')) ext = 'png';
                else if (contentType.includes('image/gif') || file.includes('.gif')) ext = 'gif';
            }
            else if (file.startsWith('data:')) {
                const matches = file.match(/^data:([A-Za-z0-9.+-]+\/[A-Za-z0-9.+-]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    contentType = matches[1];
                    buffer = Buffer.from(matches[2], 'base64');
                    ext = contentType.split('/')[1] || 'jpg';
                    if (ext === 'quicktime') ext = 'mov';
                }
            }
            else if (fs.existsSync(file)) {
                buffer = fs.readFileSync(file);
                ext = path.extname(file).replace('.', '').toLowerCase() || 'jpg';
                if (ext === 'mp4') contentType = 'video/mp4';
                else if (ext === 'mov') contentType = 'video/quicktime';
                else if (ext === 'png') contentType = 'image/png';
                else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
            }
            else if (/^[A-Za-z0-9+/=]+$/.test(file) && file.length > 100) {
                buffer = Buffer.from(file, 'base64');
                contentType = 'video/mp4';
                ext = 'mp4';
            }

            if (buffer) {
                filename = `media_${Date.now()}.${ext}`;
                form.append('files[0]', buffer, { filename, contentType });
                hasFile = true;
            }
        }

        const payload: any = { content };
        if (hasFile) {
            payload.attachments = [{ id: 0, filename }];
        }
        form.append('payload_json', JSON.stringify(payload));

        const response = await axios.post(process.env.DISCORD! + '?wait=true', form, {
            headers: { ...form.getHeaders() },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        });
    }

    async waitForBlobAvailable(did: string, cid: string, maxAttempts = 10, delayMs = 2000): Promise<boolean> {
        for (let i = 0; i < maxAttempts; i++) {
            try {
                await agent.com.atproto.sync.getBlob({ did, cid });
                return true;
            } catch (err) {
                console.log(`Blob ще не доступний, спроба ${i + 1}/${maxAttempts}`);
                await new Promise(r => setTimeout(r, delayMs));
            }
        }
        return false;
    }

    

async uploadToBlueSky(fileData: string, mimeType: string) {
       const VIDEO_SERVICE_DID = 'did:web:video.bsky.app';
    const base64Data = fileData.includes(',') ? fileData.split(',')[1] : fileData;
    let buffer: Buffer = Buffer.from(base64Data, 'base64');  // ← явна анотація типу

    if (mimeType.startsWith('video/')) {
        try {
            buffer = await makeVideoUnique(buffer);  // тепер каст не потрібен взагалі
            console.log("✅ Відео ремуксовано з унікальним метаданим (новий хеш)");
        } catch (remuxErr: any) {
            console.warn("⚠️ Не вдалося зробити відео унікальним, продовжую з оригіналом:", remuxErr.message || remuxErr);
        }


        const userDid = agent.session!.did;
        const pdsHost = await getPdsHost(userDid);

        // Токен для getUploadLimits — aud = video service
        const { data: limitsAuth } = await agent.com.atproto.server.getServiceAuth({
            aud: VIDEO_SERVICE_DID,
            lxm: "app.bsky.video.getUploadLimits",
            exp: Math.floor(Date.now() / 1000) + 60 * 30,
        });

        try {
            const limitsResponse = await fetch("https://video.bsky.app/xrpc/app.bsky.video.getUploadLimits", {
                headers: { Authorization: `Bearer ${limitsAuth.token}` }
            });
            const limits = await limitsResponse.json() as any;
            console.log("Ліміти на відеозавантаження:", JSON.stringify(limits));

            if (limits?.canUpload === false) {
                throw new Error(`Досягнуто ліміту на відеозавантаження для акаунта: ${limits.message || 'причина невідома'}`);
            }
        } catch (limitsErr: any) {
            if (limitsErr.message?.startsWith('Досягнуто ліміту')) throw limitsErr;
            console.warn("⚠️ Не вдалося перевірити ліміти відео:", limitsErr.message || limitsErr);
        }

        // Токен для uploadVideo — aud = PDS, lxm = com.atproto.repo.uploadBlob
        const { data: uploadAuth } = await agent.com.atproto.server.getServiceAuth({
            aud: `did:web:${pdsHost}`,
            lxm: "com.atproto.repo.uploadBlob",
            exp: Math.floor(Date.now() / 1000) + 60 * 30,
        });

        const uploadUrl = new URL("https://video.bsky.app/xrpc/app.bsky.video.uploadVideo");
        uploadUrl.searchParams.append("did", userDid);
        uploadUrl.searchParams.append("name", `video_${Date.now()}.mp4`);

        const uploadResponse = await fetch(uploadUrl, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${uploadAuth.token}`,
        "Content-Type": mimeType,
        "Content-Length": String(buffer.length),
    },
    body: new Uint8Array(buffer),
});

        const jobStatus = await uploadResponse.json() as any;
        console.log("Відповідь uploadVideo:", JSON.stringify(jobStatus));

        if (!uploadResponse.ok && jobStatus.error !== 'already_exists') {
            throw new Error(`Помилка завантаження відео: ${JSON.stringify(jobStatus)}`);
        }

        if (jobStatus.error === 'already_exists') {
            console.warn("⚠️ video.bsky.app повернув already_exists — можливо застарілий/непідтверджений blob із попередньої спроби.");
        }

        const videoAgent = new BskyAgent({ service: "https://video.bsky.app" });
        let blob = jobStatus.blob;

        while (!blob && jobStatus.jobId) {
            await new Promise(r => setTimeout(r, 3000));
            const { data: status } = await videoAgent.app.bsky.video.getJobStatus({
                jobId: jobStatus.jobId,
            });

            if (status.jobStatus.state === 'JOB_STATE_COMPLETED') {
                blob = status.jobStatus.blob;
                break;
            } else if (status.jobStatus.state === 'JOB_STATE_FAILED') {
                throw new Error(`Транскодування відео провалилось: ${status.jobStatus.error || 'невідома помилка'}`);
            }
        }

        if (!blob) {
            throw new Error("Не вдалося отримати blob відео після обробки.");
        }

        const cidString = typeof blob.ref === 'object' && blob.ref !== null && 'toString' in blob.ref
            ? blob.ref.toString()
            : String(blob.ref);

        const available = await this.waitForBlobAvailable(userDid, cidString);
        if (!available) {
            throw new Error(
                `Blob ${cidString} не підтверджено на PDS після очікування. ` +
                `Схоже на застарілий/непідтверджений blob із попередньої невдалої спроби (video.bsky.app повернув already_exists). ` +
                `Спробуйте перезавантажити відеофайл заново (наприклад, перекодувавши його), щоб отримати новий хеш і уникнути дедуплікації.`
            );
        }

        return {
            $type: 'blob',
            ref: blob.ref,
            mimeType: blob.mimeType || mimeType,
            size: blob.size
        };
    }

    const upload = await agent.uploadBlob(buffer, { encoding: mimeType });
    if (!upload?.data?.blob) {
        throw new Error("Не вдалося завантажити зображення у Bluesky.");
    }
    return upload.data.blob;
}

    async SendBlueSky(content: string, file?: any) {
        await initBlueSky();

        const fileString = file ? String(file).trim() : "";

        try {
            if (fileString !== "") {
                let mimeType = 'image/jpeg';
                if (fileString.startsWith('data:image/png') || fileString.endsWith('.png')) {
                    mimeType = 'image/png';
                } else if (fileString.startsWith('data:video/mp4') || fileString.endsWith('.mp4')) {
                    mimeType = 'video/mp4';
                }

                console.log(`Обробка та завантаження медіа (${mimeType}) в Bluesky...`);
                const mediaBlob = await this.uploadToBlueSky(fileString, mimeType);

                if (mimeType.startsWith('video/')) {
                    let attempts = 0;
                    let posted = false;
                    while (attempts < 3 && !posted) {
                        try {
                            console.log("Відправка поста з відео...");
                            await agent.post({
                                text: content,
                                embed: {
                                    $type: "app.bsky.embed.video",
                                    video: mediaBlob,
                                    alt: content
                                }
                            });
                            posted = true;
                        } catch (postErr: any) {
                            attempts++;
                            const msg = postErr?.message || '';
                            if (msg.includes('Could not find blob') && attempts < 3) {
                                console.log(`Blob ще не проіндексовано, повтор ${attempts}/3...`);
                                await new Promise(r => setTimeout(r, 3000 * attempts));
                            } else {
                                throw postErr;
                            }
                        }
                    }
                } else {
                    console.log("Відправка поста з картинкою...");
                    await agent.post({
                        text: content,
                        embed: {
                            $type: "app.bsky.embed.images",
                            images: [
                                {
                                    alt: content,
                                    image: mediaBlob
                                }
                            ]
                        }
                    });
                }
            } else {
                console.log("Відправка текстового поста...");
                await agent.post({
                    text: content
                });
            }
            console.log("✅ Успішно опубліковано у Bluesky!");
        } catch (error: any) {
            console.error("❌ ПОМИЛКА Bluesky:", error?.response?.data || error.message || error);
        }
    }
}