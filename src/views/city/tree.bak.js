// import axios from 'axios'

// axios.get('/findAll.json').then(res => {
//   const areaList = res.data.data
//   areaTree(areaList)
// })

function sortByCode(type, code, areaMap) {
  const [start, end] = type === 'province' ? [0, 2] : type === 'city' ? [0, 4] : [4, 6]
  const mark = code.slice(start, end)
  const list = {}
  Object.keys(areaMap).forEach(code => {
    if (code.slice(start, end) === mark) {
      list[code] = areaMap[code]
    }
  })
  return list
}

function formatter(areaMap) {
  return Object.keys(areaMap).map(code => ({
    code,
    name: areaMap[code]
  }))
}

export function areaTree(areaList) {
  const { provinceList, cityList, countyList } = areaList

  const tree = Object.keys(provinceList).map(code => {
    let result = {}
    const city = sortByCode('province', code, cityList)
    if (Object.keys(city).length === 0) {
      result = {
        code: code,
        name: provinceList[code],
        children: [
          {
            code: code,
            name: provinceList[code],
            children: formatter(sortByCode('province', code, countyList))
          }
        ]
      }
    } else {
      const county = Object.keys(city).map(item => ({
        code: item,
        name: city[item],
        children: formatter(sortByCode('city', item, countyList))
      }))
      result = {
        code: code,
        name: provinceList[code],
        children: county
      }
    }
    return result
  })
  // console.log(tree)
  return tree
}
