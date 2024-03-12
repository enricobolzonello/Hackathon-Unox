import json_lib as glib #reference to local lib script
import sys
import json
#

if __name__ == "__main__":

    # input_text = st.text_area("Input text", height=500, label_visibility="collapsed")
    input_text = sys.argv[1]

    pre_prompt = '\n\nContext: You are the assistent of a smart oven, taking informations from a human.\n\nHuman: '
    post_prompt = '''\n
    Based on the above text, please don't answer, but encode the question in JSON format:
    Question: Temperature, Set_timer, or Stop_timer (else Not_Valid)
    Value: integer if Set_timer (else 0)
    Unit: Minutes or Seconds if Set_timer (else None).
    '''

    post_prompt = '''\n
    Based on the above text, please don't answer, but encode the question in JSON format:
    Question: On_or_Off, Mode, Working_Time, Humidity, Set_Humidity, Set_Preheat, Temperature, Set_Temperature, Set_timer, or Stop_timer (else Not_Valid)
    (Hours)
    (Minutes)
    (Seconds)
    (Value: value with unit)
    (Holding Time: for set preheat)
    (other parameters if set).
    '''

    if not input_text.lower().startswith("oven"):
        response_content = {"Command": "Not_Valid", "Value": 0, "Unit": "None"}
        has_error = False
    else:
        has_error, response_content, err = glib.get_json_response(input_content=pre_prompt + input_text + post_prompt) #call the model through the supporting library

    # debug answer
    if isinstance(response_content, dict):
        json_data = json.dumps(response_content)
    else:
        if "```json" in response_content:
            start_index = response_content.find('{')
            end_index = response_content.find('}') + 1
            json_data = response_content[start_index: end_index]
        else:
            print('No json generated, the input may be unclear or incorrect. The answer from the model was:')
            print(response_content)
    
    json_dict = eval(json_data.lower())
    
    print(str(json_dict).replace("'", '"'))
