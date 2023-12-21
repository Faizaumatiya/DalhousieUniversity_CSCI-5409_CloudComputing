import json
import boto3

def lambda_handler(event, context):
    print(event['body'])
    body = json.loads(event['body'])

    # Create an SNS client
    sns = boto3.client('sns')

    # Subscribe to the SNS topic
    topic_arn = 'arn:aws:sns:us-east-1:724917608342:MyBlogTopic'
    email_address = body['email']
    subscription = sns.subscribe(TopicArn=topic_arn, Protocol='email', Endpoint=email_address)
    subscription_arn = subscription['SubscriptionArn']

    # Publish a message to the SNS topic
    message = "Thank you for your interest. Your blog post has been added successfully!"

    response = sns.publish(TopicArn=topic_arn, Message=message)
    message_id = response['MessageId']

    return {
        'statusCode': 200,
        'body': f'Subscribed to SNS topic {topic_arn} and published message {message} with ID {message_id}'
    }
