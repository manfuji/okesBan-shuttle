'use client'

import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/survey-core.css'
import { json } from '../../data/survey_json.js'

export default function SurveyComponent() {
  const model = new Model(json)

  model.onComplete.add((sender) => {
    const surveyData = sender.data

    fetch('/api/saveSurvey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(surveyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Survey saved:', data)
      })
      .catch((err) => {
        console.error('❌ Error saving survey:', err)
      })
  })

  return <Survey model={model} />
}
