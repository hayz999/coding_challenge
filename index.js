const oneToNineteen = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']

const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const amount = ['', 'thousand', 'million', 'billion', 'trillion']

let sections = []
let numWords = []

function numberToString(number) {
  let numString = number.toString()
  if (parseInt(numString) === 0) {
    return 'zero';
  }
  let start = numString.length
  breakToSections(start, numString)
}

function breakToSections(start, numString) {
  while(start > 0) {
    let end = start
    sections.push(numString.slice((start = Math.max (0, start - 3)), end))
  }
  turnToWords()
}

function turnToWords() {
  let sectionsLength = sections.length
  if(sectionsLength > amount.length) {
    return ''
  }
  for (i = 0; i < sectionsLength; i++) {
    let section = parseInt(sections[i])
    if (section) {
      let numbers = sections[i].split('').reverse().map(parseFloat)
      if (numbers[1] === 1) {
        numbers[0] += 10
      }
      if ((word = amount[i])) {
        numWords.push(word)
      }
      if ((word = oneToNineteen[numbers[0]])) {
        numWords.push(word)
      }
      if ((word = tens[numbers[1]])) {
        numWords.push(word)
      }
      if (numbers[0] || numbers[1]) {
        if (numbers[2] || !i && sectionsLength) {
          numWords.push('and')
        }
      }
      if ((word = oneToNineteen[numbers[2]])) {
        numWords.push(word + ' hundred')
      }
    }
  }
  return numWords.reverse().join(' ')
}