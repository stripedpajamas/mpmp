function* index (start) {
  for (let i = start; ; i++) {
    yield i
  }
}

function* sumOfPrimeSquares () {
  let n = 2
  let sumOfSquares = n*n
  let seen = []
  while (true) {
    yield sumOfSquares

    seen.push(n)

    if (n === 2) {
      n += 1
    } else {
      n += 2
    }

    while (seen.some(p => n % p === 0)) {
      n += 2
    }

    sumOfSquares += n*n
  }
}

function* take (iter, n) {
  for (let i = 0; i < n; i++) {
    const item = iter.next()
    if (item.done) {
      break
    }
    yield item.value
  }
}

function* filter (iter, fn) {
  for (const item of iter) {
    if (!fn(item)) continue
    yield item
  }
}

function* join (aIter, bIter) {
  let a = aIter.next()
  let b = bIter.next()

  while (!a.done && !b.done) {
    yield [a.value, b.value]

    a = aIter.next()
    b = bIter.next()
  }
}

function main (n) {
  const results = take(
    filter(
      join(sumOfPrimeSquares(), index(1)),
      ([prime, idx]) => prime % idx === 0
    ),
    n
  )

  for (const p of results) {
    console.log(p)
  }
}

main(process.argv[2] || 5)
