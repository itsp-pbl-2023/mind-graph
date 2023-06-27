import { D3Node } from "./dataType"

// テキストの幅を計算するためにcanvasを使う
const MAX_TEXT_LENGTH = 10
const canvasForCalcTextWidth = document.createElement("canvas")
const ctxForCalcTextWidth = canvasForCalcTextWidth.getContext("2d")

const calculateTextWidth = (text: string, fontSize: number) => {
  if (!ctxForCalcTextWidth) return 0
  ctxForCalcTextWidth.font = `${fontSize}px sans-serif`
  return ctxForCalcTextWidth.measureText(text.slice(0, MAX_TEXT_LENGTH)).width
}

const calculateFontSizeFromConnection = (connectionCount: number) => {
  const minFontSize = 10
  const maxFontSize = 30
  const minConnectionCount = 1
  const maxConnectionCount = 5
  const rate = Math.min(1, Math.max(0, (connectionCount - minConnectionCount) / (maxConnectionCount - minConnectionCount)))
  const fontSize = (maxFontSize - minFontSize) * rate + minFontSize
  return fontSize
}

const wrapLongText = (text: string) => {
  if (text.length < MAX_TEXT_LENGTH) {
    return text
  }
  let resultText = ''
  for(let i = 0; i < text.length; i += MAX_TEXT_LENGTH) {
    resultText += text.slice(i, i + MAX_TEXT_LENGTH) + '<tbreak />'
  }
  return resultText
}

export const updateNodeAttr = (node: D3Node) => {
  node.fontSize = calculateFontSizeFromConnection(node.connectionCount)
  node.radius = calculateTextWidth(node.word, node.fontSize) / 2 + 10
  node.wrappedText = wrapLongText(node.word)
}
