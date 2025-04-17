// app/api/saveSurvey/route.js
import { writeFile, mkdir, readFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'tmp', 'survey-data.json')

export async function POST(req: Request) {
    try {
        const surveyData = await req.json()

        await mkdir(path.dirname(filePath), { recursive: true })

        let existing = []
        try {
            const fileContent = await readFile(filePath, 'utf8')
            existing = JSON.parse(fileContent)
        } catch (_) { }

        existing.push({ ...surveyData, timestamp: new Date().toISOString() })

        await writeFile(filePath, JSON.stringify(existing, null, 2))

        return NextResponse.json({ message: 'Survey saved successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save survey' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const fileContent = await readFile(filePath, 'utf8')
        const data = JSON.parse(fileContent)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to read survey data:', error)
        return NextResponse.json([], { status: 200 }) // fallback to empty array
    }
}
