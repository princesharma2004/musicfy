from typing import List, Dict
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse
import os

app = FastAPI()

# Mount the entire songs folder for static file access
app.mount("/media", StaticFiles(directory="songs"), name="media")

@app.get("/songs")
def get_songs() -> Dict[str, List[Dict[str, str]]]:
    base_path = "songs"
    song_list: List[Dict[str, str]] = []

    for folder in os.listdir(base_path):
        folder_path = os.path.join(base_path, folder)
        if os.path.isdir(folder_path):
            song_file = next((f for f in os.listdir(folder_path) if f.endswith((".mp3", ".wav"))), None)
            poster_file = next((f for f in os.listdir(folder_path) if f.endswith((".jpeg", ".jpg", ".png"))), None)

            if song_file and poster_file:
                song_list.append({
                    "title": folder,
                    "audio_url": f"/media/{folder}/{song_file}",
                    "poster_url": f"/media/{folder}/{poster_file}"
                })

    return {"songs": song_list}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
