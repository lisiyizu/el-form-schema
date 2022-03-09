/**
 * 借鉴 westore diff 算法，得到最小粒度修改值
 * https://github.com/Tencent/westore/blob/master/packages/westore-example/miniprogram_npm/westore/index.js
 */
const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'

function diffData(current, previous) {
  const result = {}
  if (!previous) return JSON.parse(JSON.stringify(current))
  syncKeys(current, previous)
  diff(current, previous, '', result)
  return result
}

function syncKeys(current, previous) {
  if (current === previous) return
  const rootCurrentType = type(current)
  const rootPreType = type(previous)
  if (rootCurrentType === OBJECTTYPE && rootPreType === OBJECTTYPE) {
    for (const key in previous) {
      const currentValue = current[key]
      if (currentValue === undefined) {
        current[key] = null
      } else {
        syncKeys(currentValue, previous[key])
      }
    }
  } else if (rootCurrentType === ARRAYTYPE && rootPreType === ARRAYTYPE) {
    if (current.length >= previous.length) {
      previous.forEach((item, index) => {
        syncKeys(current[index], item)
      })
    }
  }
}

function diff(current, previous, path, result) {
  if (current === previous) return
  const rootCurrentType = type(current)
  const rootPreType = type(previous)
  if (rootCurrentType === OBJECTTYPE) {
    if (rootPreType !== OBJECTTYPE || Object.keys(current).length < Object.keys(previous).length && path !== '') {
      setResult(result, path, current)
    } else {
      for (const key in current) {
        const currentValue = current[key]
        const preValue = previous[key]
        const currentType = type(currentValue)
        const preType = type(preValue)
        if (currentType !== ARRAYTYPE && currentType !== OBJECTTYPE) {
          if (currentValue !== previous[key]) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          }
        } else if (currentType === ARRAYTYPE) {
          if (preType !== ARRAYTYPE) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, concatPathAndKey(path, key), currentValue)
            } else {
              currentValue.forEach((item, index) => {
                diff(item, preValue[index], concatPathAndKey(path, key) + '[' + index + ']', result)
              })
            }
          }
        } else if (currentType === OBJECTTYPE) {
          if (preType !== OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            for (const subKey in currentValue) {
              const realPath = concatPathAndKey(path, key) + (subKey.includes('.') ? `["${subKey}"]` : `.${subKey}`)
              diff(currentValue[subKey], preValue[subKey], realPath, result)
            }
          }
        }
      }
    }
  } else if (rootCurrentType === ARRAYTYPE) {
    if (rootPreType !== ARRAYTYPE) {
      setResult(result, path, current)
    } else {
      if (current.length < previous.length) {
        setResult(result, path, current)
      } else {
        current.forEach((item, index) => {
          diff(item, previous[index], path + '[' + index + ']', result)
        })
      }
    }
  } else {
    setResult(result, path, current)
  }
}

function concatPathAndKey(path, key) {
  return key.includes('.')
    ? path + `["${key}"]`
    : (path === '' ? '' : path + '.') + key
}

function setResult(result, k, v) {
  if (type(v) !== FUNCTIONTYPE) {
    result[k] = v
  }
}

function type(obj) {
  return Object.prototype.toString.call(obj)
}

export default diffData
