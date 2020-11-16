

exports.getToken = () => {
    let token1 = Math.floor(Math.random() * 100000000000000)
    let token2 = Math.floor(Math.random() * 100000000000000)
    let token = `${token1}${token2}`
    return token
}

