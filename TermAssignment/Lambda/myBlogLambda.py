import json
import boto3
# import base64
# import gzip

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogTable')

def lambda_handler(event, context):
    # Parse the data from the frontend
    data = json.loads(event['body'])
    
    scan_params = {}
    
    # Use the scan method to retrieve all items from the table
    response = table.scan(**scan_params)
    items = response['Items']
    print(items)
    blog_items =json.dumps(items)
    print(blog_items)
    itemsjson = json.loads(blog_items)
    print(len(itemsjson))
    print(type(blog_items))
    tempid = len(itemsjson) + 1
    finalid = str(tempid)

    # Extract the fields from the data
    author_id = finalid
    author_name = data['authorName']
    bio = data['authorBio']
    content = data['content']
    title = data['title']
    image_data = data['image']
    # image_data_compressed = gzip.compress(image_data)
    
    # Encode the image data in base64
    #image_data = base64.b64encode(data['image']).decode('utf-8')
    
    # Put the data in DynamoDB
    table.put_item(
        Item={
            'authorId': author_id,
            'authorName': author_name,
            'bio': bio,
            'content': content,
            'title': title,
            'imageData': image_data
        }
    )

    # Return a success message to the frontend
    return {
        'statusCode': 200,
        'body': json.dumps('Blog post added successfully')
    }
