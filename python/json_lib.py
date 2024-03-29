import os
import json
from json import JSONDecodeError
from langchain.llms.bedrock import Bedrock

#

def get_llm():

    llm = Bedrock( #create a Bedrock llm client
        credentials_profile_name=os.environ.get("BWB_PROFILE_NAME"), #sets the profile name to use for AWS credentials (if not the default)
        region_name=os.environ.get("BWB_REGION_NAME"), #sets the region name (if not the default)
        endpoint_url=os.environ.get("BWB_ENDPOINT_URL"), #sets the endpoint URL (if necessary)
        model_id="anthropic.claude-v2:1", #"ai21.j2-ultra-v1"
        # model_kwargs = {"maxTokenCount": 512, "stopSequences": [], "temperature": 0.0, "topP": 0.9 } #for data extraction, minimum temperature is best
    )

    return llm

#

def validate_and_return_json(response_text):
    try:
        response_json = json.loads(response_text) #attempt to load text into JSON
        return False, response_json, None #returns has_error, response_content, err 
    
    except JSONDecodeError as err:
        return True, response_text, err #returns has_error, response_content, err 

#

def get_json_response(input_content): #text-to-text client function
    
    llm = get_llm()

    response = llm.predict(input_content) #the text response for the prompt
    
    return validate_and_return_json(response)
