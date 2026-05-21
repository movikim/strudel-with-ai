import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const tracksDir = path.join(process.cwd(), 'tracks')
  const tracks: any[] = []

  try {
    if (!fs.existsSync(tracksDir)) {
      return NextResponse.json({ tracks: [] })
    }

    const artists = fs.readdirSync(tracksDir).filter((file) => {
      const fullPath = path.join(tracksDir, file)
      return fs.statSync(fullPath).isDirectory() && !file.startsWith('.')
    })

    for (const artist of artists) {
      const artistDir = path.join(tracksDir, artist)
      const files = fs.readdirSync(artistDir).filter((file) => file.endsWith('.md'))

      for (const file of files) {
        const filePath = path.join(artistDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')

        // Default values
        let name = file.replace(/\.md$/, '')
        let description = ''
        let tempo = ''
        let key = ''
        let duration = ''
        let code = ''

        // Parse frontmatter
        const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
        if (fmMatch) {
          const fmText = fmMatch[1]
          const lines = fmText.split('\n')
          for (const line of lines) {
            const separatorIndex = line.indexOf(':')
            if (separatorIndex !== -1) {
              const keyName = line.slice(0, separatorIndex).trim().toLowerCase()
              const valName = line.slice(separatorIndex + 1).trim()
              if (keyName === 'name') name = valName
              else if (keyName === 'description') description = valName
              else if (keyName === 'tempo') tempo = valName
              else if (keyName === 'key') key = valName
              else if (keyName === 'duration') duration = valName
            }
          }
        }

        // Parse code block
        const codeMatch = content.match(/```(?:javascript|js)\r?\n([\s\S]*?)\r?\n```/)
        if (codeMatch) {
          code = codeMatch[1]
        }

        tracks.push({
          id: `${artist}-${file.replace(/\.md$/, '')}`,
          filename: file,
          artist,
          name,
          description,
          tempo,
          key,
          duration,
          code,
        })
      }
    }

    return NextResponse.json({ tracks })
  } catch (error: any) {
    console.error('Error listing tracks:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
