// setup arrays of words that we will use to replace numbers based off index in that array
// example: 2 will look in the oneToNineteen array and once parseInt will look at index 2 of array and replace with the word 'two' instead
const oneToNineteen = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']

const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const amount = ['', 'thousand', 'million', 'billion', 'trillion']

function numberToWord(number) {
  //turn number into string so it can later be split
  let numString = number.toString()
  let wholeNumber = numString[0]
  let decimal
  // if there are decimal numbers, slice to just the hundredth place 
  if (numString.length > 1) {
    decimal = numString[1].slice(0, 2)
  }
  //if that number is 0 we want to return right away
  if (parseInt(wholeNumber) === 0) {
    return 'zero';
  }
  //get the length of the number so it knows how many times to loop
  let start = wholeNumber.length
  //set empty array to store 3 number long sections to loop over
  let sections = []
  // while loop to go through the full number and break into 3 integer long sections to push into the sections array
  while(start > 0) {
    let end = start
    sections.push(wholeNumber.slice((start = Math.max(0, start -3)), end))
  }
  // get the length of the now sectioned number; if it is less than the length of the amount array it means it is less than a thousand, so return
  let sectionsLength = sections.length
  // if over a trillion, return an empty string
  if(sectionsLength > amount.length) {
    return ''
  }
  // set another empty array to push words into as you loop through
  let numWords = []
  // loop through each section in the sections array
  for (i = 0; i < sectionsLength; i++) {
    // save each section into variable and turn into integer 
    let section = parseInt(sections[i])
    if(section) {
      // split each section into individual numbers array
      // example: number is 213, reverse it to 312. At index 1 is number 1 , we add 10 to make that 13 so we can match to the correct index in the oneToNineteen array
      let numbers = sections[i].split('').reverse().map(parseFloat)
      if(numbers[1] === 1) {
        numbers[0] += 10
      }
      // if the index of the section in the larger sections array is the index of a word in amount add that word to the final words array (thousand, million, etc.)
      if((word = amount[i])){
        numWords.push(word)
      }
      // if the value of the number at index 0 in that section matches the index of a word in the oneToNineteen array, push that word to the final words array
      if((word = oneToNineteen[numbers[0]])) {
        numWords.push(word)
      }
      // if the value of the number at index 1 in that section matches the index of a word in the tens array, push that word to the final words array
      if ((word = tens[numbers[1]])) {
        numWords.push(word)
      }
      // if there are numbers at index 0 and 1, check if there is a a number at index 2 or if there is no more numbers and still sections to loop through to then add an "and" if needed
      if(numbers[0] || numbers[1]) {
        if(numbers[2] || !i && sectionsLength >= 3) {
          numWords.push('and')
        }
      }
      // if there is a third number in that section add hundred to the end 
      if((word = oneToNineteen[numbers[2]])) {
        numWords.push(word + ' hundred')
      }
    }
  }
  // add the decimal to the end if it exists  
  if (decimal) {
    numWords.unshift('and ' + decimal + '/' + '100')
  }
  // return the whole array of words reversed back to the correct order and joined together into one string
  return numWords.reverse().join(' ')
}