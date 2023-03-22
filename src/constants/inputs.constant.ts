const inputs = [
  {
    type: 'text',
    name: 'userName',
    id: 'userName',
    label: 'Enter your name: ',
  },
  {
    type: 'date',
    name: 'bDay',
    id: 'bDay',
    label: 'Enter you B-day: ',
  },
  {
    type: 'checkbox',
    name: 'agreement',
    id: 'agreement',
    label: 'Are you learning React? ',
  },
  {
    type: 'radio',
    name: 'prefer',
    id: 'FC',
    label: 'Functions',
    value: 'functions',
  },
  {
    type: 'radio',
    name: 'prefer',
    id: 'CC',
    label: 'Classes',
    value: 'classes',
  },
  {
    type: 'file',
    name: 'upload',
    id: 'upload',
    label: 'You can upload your image: ',
  },
  {
    type: 'range',
    name: 'rate',
    id: 'rate',
    min: '0',
    max: '100',
    label: 'Rate this form, please: ',
  },
  {
    type: 'submit',
    name: 'submit',
    id: 'submit',
    value: 'Submit',
  },
];

export default inputs;
