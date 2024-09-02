// js files
import { processSubmission } from './js/formHandler.js'
// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

document.getElementById('analyze-form')
    .addEventListener('submit', processSubmission);
