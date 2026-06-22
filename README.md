# openai-voice-agent

<img width="1000" height="590" alt="image" src="https://github.com/user-attachments/assets/bc86634b-0c82-48a5-a3ca-3126e71c313e" />


# AI 音声アシスタント

OpenAI Realtime API を活用したリアルタイム音声アシスタントです。

ユーザーはブラウザから音声でAIと対話でき、調査レポートや分析結果をPDFとして生成・ダウンロードできます。

---

## 主な機能

### リアルタイム音声対話

* マイク入力対応
* AI音声応答
* WebRTCベースの低遅延通信
* 日本語会話対応

### PDFレポート生成

ユーザーが以下のような依頼を行った場合：

* 「レポートを作成して」
* 「PDFにまとめて」
* 「分析結果を保存したい」

AIは自動的にPDF生成機能を呼び出し、ローカルサーバー上にレポートを作成します。

生成されたPDFはブラウザから直接ダウンロードできます。

### ビジネス分析対応

以下の用途を想定しています：

* 株式市場分析
* 業界調査
* 企業分析
* マーケットレポート
* AIコンサルティング

---

## システム構成

Frontend

* HTML
* JavaScript
* WebRTC

Backend

* Node.js
* Express

AI

* OpenAI Realtime API

PDF

* PDFKit
* Noto Sans CJK Font

---

## ディレクトリ構成

```text
project/
│
├─ public/
│   ├─ index.html
│   ├─ downloads/
│
├─ fonts/
│   └─ NotoSansCJKsc-Regular.otf
│
├─ server.js
├─ package.json
├─ .env
│
└─ README.md
```

---

## インストール

### 1. リポジトリ取得

```bash
git clone <repository-url>
cd openai-voice-agent
```

### 2. パッケージインストール

```bash
npm install
```

### 3. 環境変数設定

`.env`

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
PORT=3000
```

---

## フォント設定

PDFで日本語・中国語を正しく表示するため、以下のフォントを配置してください。

```text
fonts/NotoSansCJKsc-Regular.otf
```

推奨フォント：

* Noto Sans CJK SC
* Source Han Sans

---

## 起動方法

```bash
node server.js
```

起動後：

```text
http://localhost:3000
```

へアクセスしてください。

---

## PDF生成

生成されたPDFは以下に保存されます。

```text
public/downloads/
```

例：

```text
AI_Report_1750345623000.pdf
```

ブラウザから直接アクセス可能：

```text
http://localhost:3000/downloads/AI_Report_xxxxx.pdf
```

---

## 使用例

### 市場分析

ユーザー：

```text
アメリカ株市場の最新動向を分析してください。
```

AI：

```text
市場分析を実施しました。
PDFレポートを生成します。
```

### 業界レポート

ユーザー：

```text
生成AI業界の市場調査をまとめてください。
```

AI：

```text
業界分析レポートを作成しました。
PDFをダウンロードできます。
```

---

## セキュリティ

* OpenAI API Key は必ず `.env` に保存してください

`.gitignore`

```text
.env
node_modules
public/downloads
```

---

## 必要環境

* Node.js 20+
* npm 10+
* Google Chrome 最新版

---

## ライセンス

MIT License

---

## Author

Developed with OpenAI Realtime API and Node.js.
