import subprocess

import webview
from flask import Flask, jsonify, render_template
from flask import request

from deleterFiles import delete_files
from duplicator import get_duplicate_list
from directoryTreeReturner import process_directory
from flask_cors import CORS

# app = Flask(__name__)
app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app=app, resources={r'/*': {'origins': '*'}})


# CORS(app=app, resources={
#     r'/getDuplicateFiles': {'origins': '*'},
#     r'/anotherEndpoint': {'origins': '*'}
# })


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.route('/getDuplicateFiles')
def get_list():  # put application's code here
    route = request.args.get('dir')
    return jsonify(get_duplicate_list(route))


@app.route('/getDirectoryTree')
def get_directory_tree():  # put application's code here
    route = request.args.get('dir_path')
    return jsonify(process_directory(route))


@app.route('/openFile')
def open_file():  # put application's code here
    file_path = request.args.get('file_dir')
    subprocess.Popen(f'explorer /select,"{file_path}"')
    return {'message': 'File Opened'}


@app.route('/deleteSelectedFiles', methods=['POST'])
def handle_post_request():
    file_urls = request.get_json()
    # Обработка полученных данных
    # ...
    delete_files(file_urls)
    # Возвращаем ответ
    return {'message': 'File deleted'}


if __name__ == '__main__':
    # app.run(debug=True)
    # app.run(use_reloader=True, port=5000, threaded=True)

    window_width = 1600
    window_height = 1000

    webview.create_window("My App", app, width=window_width, height=window_height)
    webview.start(http_server="127.0.0.1", http_port=5000)
