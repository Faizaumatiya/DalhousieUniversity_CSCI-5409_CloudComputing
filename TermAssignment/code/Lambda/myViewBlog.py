import json
import boto3
import base64

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogTable')

def lambda_handler(event, context):

    # Set up the scan parameters
    scan_params = {}
    
    # Use the scan method to retrieve all items from the table
    response = table.scan(**scan_params)
    items = response['Items']
    print(items) 
    blog_items =json.dumps(items)
   
    print(type(blog_items))
    itemsjson = json.loads(blog_items)
    print(itemsjson)
   
    return{
        'statusCode': 200,
        'body': itemsjson
    }