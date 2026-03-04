from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    name    = data.get('name', '').strip()
    email   = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Field wajib tidak boleh kosong.'}), 400

    # TODO: integrate email / WhatsApp / database here
    print(f"[MSG] From: {name} <{email}> | Subject: {subject}\n{message}")

    return jsonify({'status': 'ok', 'message': 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
