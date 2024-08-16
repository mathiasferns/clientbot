# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain import OpenAI, ConversationChain

app = FastAPI()

# Initialize LangChain's conversation model
llm = OpenAI(model_name="text-davinci-003")
conversation = ConversationChain(llm=llm)

class Message(BaseModel):
    content: str

@app.post("/chat")
async def chat(message: Message):
    try:
        response = conversation.run(message.content)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
