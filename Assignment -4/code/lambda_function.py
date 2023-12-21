import json
import boto3

sqs = boto3.client('sqs')


def lambda_handler(event, context):
    try:
        # request_body = json.loads(event['body'])
        message_type = event['type']
        print(message_type)
        if message_type == 'CONNECT':
            queue_url = 'https://sqs.us-east-1.amazonaws.com/724917608342/connect-queue'
            return {
                'type': 'CONNACK',
                'returnCode': 0,
                'username': 'user1',
                'password': 'pass123'
            }
        elif message_type == 'SUBSCRIBE':
            queue_url = 'https://sqs.us-east-1.amazonaws.com/724917608342/subscribe-queue'
            return {
                'type': 'SUBACK',
                'returnCode': 0
            }
        elif message_type == 'PUBLISH':
            queue_url = 'https://sqs.us-east-1.amazonaws.com/724917608342/publish-queue'
            return {
                'type': 'PUBACK',
                'returnCode': 0,
                'payload': {
                    'key': 'location',
                    'value': '44.637437,-63.587206'
                }
            }
        else:
            return {
                'statusCode': 400,
                'body': f'Invalid message type: {message_type}.'
            }

        response = sqs.receive_message(
            QueueUrl=queue_url,
            AttributeNames=[
                'SentTimestamp'
            ],
            MaxNumberOfMessages=1,
            MessageAttributeNames=[
                'All'
            ],
            VisibilityTimeout=0,
            WaitTimeSeconds=0
        )

        if 'Messages' in response:
            message = response['Messages'][0]
            receipt_handle = message['ReceiptHandle']
            sqs.delete_message(
                QueueUrl=queue_url,
                ReceiptHandle=receipt_handle
            )
            return {
                'statusCode': 204,
                # 'body': json.dumps(response_body)
            }
    except KeyError:
        return {
            'statusCode': 400,
            'body': 'Invalid request body. Missing required key: "type".'
        }
