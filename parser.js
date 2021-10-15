const initial_parser = (query) => {
    let words_array =[]

    let regex = /(?=.*SELECT.*FROM).*$/
    if (query.match(regex)) {
        words_array =  query.split(/(SELECT|FROM|WHERE|JOIN)/)
    }
    console.log(words_array)
    return words_array
}

