import boto3
import botocore
import requests
from flask import Flask, jsonify, request, Response

app = Flask(__name__)

bucket_name = 'my-assign2-bucket'
file_name = 'assign2-test.txt'


s3 = boto3.client('s3',
                  aws_access_key_id="ASIA2RSDU36LN26UXEFS",
                  aws_secret_access_key="2ZkxzELpVLt0nIBuxw5g0nNaYN2mXNcPo2uUYBVz",
                  aws_session_token="FwoGZXIvYXdzEKX//////////wEaDERECfNGj++3FKmjJyLAAeBW4NXn+dasu8fcWUIewPG7f673kvxC3netLCBS6ScTHL50nWeS029+6ktKrhAPvwfeVlXj1wskexa4oJnB+zoW4zvbSxVn+Y5YmJGx/h0wuUZhqz0t1vEcJMyYvOcUWHdd7cCvGPUis5twOTmBExqtoj0vz42Qec2UnnaDt6vt1xoqBQd+E2BNqDlJwEBHrg4ISVSNhgST6UIzT50VR0V3/exCkBJ0DqJbeM4b6gIZ7b2LNUEJL24pRWSflvTfnyj4peufBjIt2aTEdcmrB6CO30mfeInP67QGl6n8kQlHC4Hi5FnsOdK1ouszGycADHZgZm2e",
                  region_name="us-east-1")


@app.route('/storedata', methods=['POST'])
def store_data():
    data = request.json['data']
    print("API Called")
    s3.create_bucket(Bucket=bucket_name)
    s3.put_object(Bucket=bucket_name,
                  Key=file_name, Body=data)
    s3_uri = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
    response_data = {'s3uri': s3_uri}
    return jsonify(response_data)


@app.route('/appenddata', methods=['POST'])
def append_data():
    data = request.json['data']

    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_name)
        file_content = response['Body'].read()
        body = file_content.decode('utf-8')
        print("Successfully downloaded data from bucket")
        print(body)
        updated = body + data
        s3.put_object(Bucket=bucket_name, Key=file_name,
                      Body=updated.encode('utf-8'))

    except Exception as e:
        print(e)
    return jsonify({'message': 'Data appended successfully'}), 200


@app.route('/deletefile', methods=['POST'])
def delete_file():

    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=file_name)

    if 'Contents' in response:
        print(f"The file {file_name} exists in S3 bucket {bucket_name}")
        s3.delete_object(Bucket=bucket_name, Key=file_name)
        return '', 200
    else:
        print(
            f"The file {file_name} does not exist in S3 bucket {bucket_name}")
        return '', 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
