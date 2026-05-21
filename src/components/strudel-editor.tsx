'use client'

import { useStrudel } from '@/hooks/use-strudel'
import { useAudioRecorder, formatDuration } from '@/hooks/use-audio-recorder'
import { DEFAULT_CODE } from '@/lib/constants'
import { Play, Square, RefreshCw, Circle, Download, Trash2, Music, Loader2, PlayCircle, Sparkles } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

type Track = {
  id: string
  filename: string
  artist: string
  name: string
  description: string
  tempo: string
  key: string
  duration: string
  code: string
}

export function StrudelEditor() {
  const { loaded, isPlaying, editorRef, play, stop, getEditor } = useStrudel()
  const {
    isRecording,
    duration,
    recordedUrl,
    startRecording,
    stopRecording,
    downloadRecording,
    dismissRecording,
  } = useAudioRecorder(() => null)

  const [tracks, setTracks] = useState<Track[]>([])
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch tracks from API
  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/tracks')
        const data = await res.json()
        if (data.tracks) {
          setTracks(data.tracks)
        }
      } catch (err) {
        console.error('Failed to fetch tracks:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  // Load code into editor and sync with server
  const loadTrack = useCallback(async (track: Track, shouldPlay = false) => {
    const editor = getEditor()
    if (editor) {
      editor.setCode(track.code)
      setSelectedTrackId(track.id)

      // Sync with server state so that events / SSE can broadcast it
      try {
        await fetch('/api/code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: track.code })
        })
      } catch (err) {
        console.error('Failed to sync code with server:', err)
      }

      if (shouldPlay) {
        // Wait slightly for code to be set in CodeMirror
        setTimeout(async () => {
          await play()
        }, 150)
      }
    }
  }, [getEditor, play])

  // Group tracks by artist
  const groupedTracks = tracks.reduce<Record<string, Track[]>>((acc, track) => {
    acc[track.artist] = acc[track.artist] || []
    acc[track.artist].push(track)
    return acc
  }, {})

  if (!loaded) {
    return <div className="h-screen bg-background" />
  }

  return (
    <div className="h-screen w-screen flex bg-background relative overflow-hidden">
      {/* Library Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-4 h-10 rounded-lg backdrop-blur-md border border-border/50 text-sm font-medium transition-all shadow-lg cursor-pointer ${
          isSidebarOpen
            ? 'bg-primary/20 text-primary border-primary/50'
            : 'bg-card/85 text-muted-foreground hover:text-foreground hover:bg-card'
        }`}
      >
        <Music className="size-4" />
        <span>Library</span>
      </button>

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 z-40 bg-card/65 backdrop-blur-xl border-r border-border/40 flex flex-col transition-transform duration-350 ease-out shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-6 pt-20 pb-4 border-b border-border/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="font-bold text-md tracking-tight">Tracks Library</h2>
          </div>
          <span className="text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
            {tracks.length} tracks
          </span>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin">
          {loading ? (
            <div className="h-40 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="size-6 animate-spin text-primary" />
              <span className="text-xs">Scanning tracks...</span>
            </div>
          ) : tracks.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-muted-foreground text-xs">
              No tracks found in tracks/
            </div>
          ) : (
            Object.entries(groupedTracks).map(([artist, artistTracks]) => (
              <div key={artist} className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-primary/80 px-2">
                  {artist}
                </h3>
                <div className="space-y-1.5">
                  {artistTracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => loadTrack(track, false)}
                      className={`group relative flex flex-col gap-1.5 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        selectedTrackId === track.id
                          ? 'bg-primary/5 border-primary/40 shadow-sm shadow-primary/5'
                          : 'bg-card/20 border-transparent hover:border-border/30 hover:bg-card/40'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span
                          className={`font-semibold text-xs transition-colors duration-200 ${
                            selectedTrackId === track.id ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {track.name}
                        </span>
                        
                        {/* Play Now icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            loadTrack(track, true)
                          }}
                          title="Play instantly"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-primary text-primary-foreground hover:scale-105 duration-100 shadow-md"
                        >
                          <PlayCircle className="size-3.5" />
                        </button>
                      </div>

                      {track.description && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {track.description}
                        </p>
                      )}

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {track.tempo && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-muted/80 text-foreground border border-border/20">
                            {track.tempo.includes('~') 
                              ? track.tempo.substring(track.tempo.indexOf('~') + 1, track.tempo.indexOf(')')) 
                              : track.tempo}
                          </span>
                        )}
                        {track.key && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-muted/80 text-foreground border border-border/20">
                            🔑 {track.key}
                          </span>
                        )}
                        {track.duration && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-muted/80 text-foreground border border-border/20">
                            ⏱️ {track.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace (Editor + Controls) */}
      <div 
        className={`flex-1 h-screen flex flex-col relative transition-all duration-300 ${
          isSidebarOpen ? 'pl-80' : 'pl-0'
        }`}
      >
        {/* Editor */}
        <div className="editor-container">
          {/* @ts-expect-error - strudel-editor is a custom web component */}
          <strudel-editor ref={editorRef} code={DEFAULT_CODE} lineWrapping />
        </div>

        {/* Recording Preview Toast */}
        {recordedUrl && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col gap-3 bg-card/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-border/50 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <audio src={recordedUrl} controls className="h-10 w-72" />
            <div className="flex gap-2">
              <button
                onClick={dismissRecording}
                className="flex-1 h-9 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center gap-2 transition-colors text-sm font-medium"
              >
                <Trash2 className="size-4" />
                Discard
              </button>
              <button
                onClick={downloadRecording}
                className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Download className="size-4" />
                Download
              </button>
            </div>
          </div>
        )}

        {/* Floating Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card/90 backdrop-blur-lg rounded-full px-2 py-2 shadow-2xl border border-border/50 z-30">
          {/* Record Button */}
          <button
            onClick={handleRecordClick}
            className={`h-10 rounded-full flex items-center justify-center gap-2 transition-all ${
              isRecording
                ? 'bg-red-500 text-white px-4 animate-pulse'
                : 'w-10 text-muted-foreground hover:text-red-500 hover:bg-red-500/10'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="size-3 fill-current" />
                <span className="text-sm font-medium">{formatDuration(duration)}</span>
              </>
            ) : (
              <Circle className="size-4 fill-current text-red-500" />
            )}
          </button>

          {/* Play/Stop Button */}
          <button
            onClick={isPlaying ? stop : play}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Square className="size-5 fill-current" /> : <Play className="size-5 ml-0.5 fill-current" />}
          </button>

          {/* Refresh Button */}
          <button
            onClick={play}
            className="w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-colors"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
