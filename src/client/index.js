// Import JS files
import { processSubmission } from './js/travelHandler';

// Import SCSS files
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Add event listener to the form
document.getElementById('travel-form').addEventListener('submit', processSubmission);
