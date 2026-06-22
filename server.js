import Express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';
import PDFDocument from 'pdfkit';

dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.static('public'));

const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}


// ==========================================
// 1. OpenAI Realtime API セッショントークン発行 (GA版完全対応)
// ==========================================
app.get('/api/session', async (req, res) => {
  try {
    //GA版の正しいエンドポイント
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-realtime-mini",
          audio: {
            output: {
              voice: "alloy"
            }
          },
          instructions: "あなたは最先端AIコンサルタントです。親切かつ簡潔に日本語で回答してください。ユーザーから「ファイルを生成して」「PDFをダウンロードしたい」「レポートをまとめて」といった要望があった場合、必ず 'generate_pdf' ツールを呼び出してローカルレポートを作成してください。",
          tools: [
            {
              type: "function",
              name: "generate_pdf",
              description: "対話の調査結果に基づいて、ユーザーが閲覧・ダウンロードできる美しいPDFレポートをローカルに生成します。",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "PDFレポートのタイトル" },
                  content: { type: "string", description: "PDFレポートの詳細な本文内容（長文対応）" }
                },
                required: ["title", "content"]
              }
            }
          ]
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("OpenAI API エラー:", data);
      return res.status(response.status).json(data);
    }

    console.log("セッショントークンの取得に成功しました！");
    res.json(data);

  } catch (error) {
    console.error("通信エラー:", error);
    res.status(500).json({ error: "セッションを作成できませんでした" });
  }
});

// ==========================================
// 2. ローカルPDF生成用エンドポイント
// ==========================================
app.post('/api/generate-pdf', (req, res) => {
  try {
    const { title, content } = req.body;
    const filename = `AI_Report_${Date.now()}.pdf`;
    const filePath = path.join(downloadsDir, filename);

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ダウンロードしたotfフォントを適用
    const fontPath = path.join(
      process.cwd(),
      'fonts',
      'NotoSansCJKsc-Regular.otf'
    );

    doc.font(fontPath);

    doc.fontSize(24).fillColor('#1e3a8a').text(title || 'AI Research Report', { align: 'center' });
    doc.moveDown(1.5);
    doc.fontSize(12).fillColor('#334155').text(content || 'No text provided.', { lineGap: 6, align: 'left' });
    doc.end();

    stream.on('finish', () => {
      res.json({ url: `/downloads/${filename}`, filename });
    });
  } catch (error) {
    console.error("PDF生成エラー:", error);
    res.status(500).json({ error: "PDFのローカル生成に失敗しました" });
  }
});

app.listen(port, () => {
  console.log(`音声フルスタックサービスが http://localhost:${port} で正常に起動しました！`);
});