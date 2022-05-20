from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import requests

from collections import Counter

import spectral.io.envi as envi

from spectral import *

import re, os,sys

app = Flask(__name__)
CORS(app)


@app.route('/api/test')
def index():
    return jsonify("sucess")

@app.route('/api/generate_image',  methods=['POST'])
def generate_image():
    file_name = "Yu.hdr"
    task_path = "/webodm/project/5/task/9fc54762-3c61-4914-ae36-b78efd91bafb/"
    hdr_path = "/webodm/project/5/task/9fc54762-3c61-4914-ae36-b78efd91bafb/Yu.hdr"
    os.system(f'cp {hdr_path} .' )
    
    img = envi.open(hdr_path, image=hdr_path)
    # img = open_image(file_name)
    
    img_str_list = img.__str__().split("\t")
    rows = int(re.findall(r"\d+", img_str_list[2])[0])
    samples = int(re.findall(r"\d+", img_str_list[3])[0])
    bands = int(re.findall(r"\d+", img_str_list[4])[0])
    print(rows, samples, bands)
    img_file_path_1 = os.path.join(task_path, "rgb1.jpg")
    save_rgb(img_file_path_1, img, bands=(1, 1, 1))
    vi = ndvi(img, 0, 0)
    img_file_path_2 = os.path.join(task_path, "rgb2.jpg")
    save_rgb(img_file_path_2, vi)
    return jsonify({
        "rows": rows,
        "samples": samples,
        "bands": bands,
        "image_file_path_1": img_file_path_1,
        "image_file_path_2": img_file_path_2,
    })



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
