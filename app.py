from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# ─── Konfigurasi Email ────────────────────────────────────────
app.config['MAIL_SERVER']         = 'smtp.gmail.com'
app.config['MAIL_PORT']           = 587
app.config['MAIL_USE_TLS']        = True
app.config['MAIL_USERNAME']       = 'beetcenterindonesia@gmail.com'   # ← email pengirim
app.config['MAIL_PASSWORD']       = 'zqviulhuqrtdtfxe'               # ← App Password (tanpa spasi)
app.config['MAIL_DEFAULT_SENDER'] = 'beetcenterindonesia@gmail.com'

mail = Mail(app)

RECIPIENT_EMAIL = 'beetcenterindonesia@gmail.com'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send-message', methods=['POST'])
def send_message():
    data    = request.get_json()
    name    = data.get('name', '').strip()
    email   = data.get('email', '').strip()
    subject = data.get('subject', '').strip() or '(Tanpa Subjek)'
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Field wajib tidak boleh kosong.'}), 400

    try:
        msg = Message(
            subject=f'[Pesan Baru] {subject}',
            recipients=[RECIPIENT_EMAIL],
            reply_to=email,
            body=f"""Pesan baru dari website:

Nama    : {name}
Email   : {email}
Subjek  : {subject}

Pesan:
{message}"""
        )
        mail.send(msg)
        print(f"[MAIL OK] Email terkirim dari {name} <{email}>")

    except Exception as e:
        print(f"[MAIL ERROR] {e}")
        return jsonify({'status': 'error', 'message': f'Gagal kirim email: {str(e)}'}), 500

    return jsonify({'status': 'ok', 'message': 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
