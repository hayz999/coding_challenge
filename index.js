const oneToNineteen = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']

const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const amount = ['', 'thousand', 'million', 'billion', 'trillion']

function numberToWord(number) {
  let numString = number.toString()
  let wholeNumber = numString[0]
  let decimal
  if (numString.length > 1) {
    decimal = numString[1].slice(0, 2)
  }
  if (parseInt(wholeNumber) === 0) {
    return 'zero';
  }
  let start = wholeNumber.length
  let sections = []
  while (start > 0) {
    let end = start
    sections.push(wholeNumber.slice((start = Math.max(0, start - 3)), end))
  }
  let sectionsLength = sections.length
  if (sectionsLength > amount.length) {
    return ''
  }
  let numWords = []
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
        if (numbers[2] || !i && sectionsLength >= 3) {
          numWords.push('and')
        }
      }
      if ((word = oneToNineteen[numbers[2]])) {
        numWords.push(word + ' hundred')
      }
    }
  }
  if (decimal) {
    numWords.unshift('and ' + decimal + '/' + '100')
  }
  return numWords.reverse().join(' ')
}