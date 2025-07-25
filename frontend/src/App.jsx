import { useState } from 'react'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import { SongContextProvider } from './context/SongContextProvider'

function App()
{
  return (
    <SongContextProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <MainContent />
        <Player />
      </div>
    </SongContextProvider>
  )
}

export default App
