export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  if (!password) return "A senha é obrigatória."
  if (password.length < 8) return "A senha deve ter no mínimo 8 caracteres."
  if (!/[a-zA-Z]/.test(password)) return "A senha deve conter pelo menos uma letra."
  if (!/[0-9]/.test(password)) return "A senha deve conter pelo menos um número."
  return null
}


const numberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 20,
})

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export const formatBRL = (value) => {
  const numericValue = Number(value ?? 0)
  return Number.isFinite(numericValue) ? currencyFormatter.format(numericValue) : "—"
}

export const formatNumber = (value) => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numberFormatter.format(numericValue) : "—"
}

export const addThousandsSeparator = (num) => {
  if (num == null || num === "") return ""
  return formatNumber(num)
}

const parseDate = (value) => {
  if (value == null || value === "") return null

  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const isCivilDate = (value) =>
  typeof value === "string" &&
  (/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    /^\d{4}-\d{2}-\d{2}T00:00:00(?:\.000)?Z$/.test(value))

const formatDate = (value, options) => {
  const date = parseDate(value)
  if (!date) return ""

  return new Intl.DateTimeFormat("pt-BR", {
    ...options,
    timeZone: isCivilDate(value) ? "UTC" : "America/Sao_Paulo",
  }).format(date)
}

export const formatShortDate = (value) =>
  formatDate(value, { day: "2-digit", month: "2-digit", year: "numeric" })

export const formatMonthYear = (value) =>
  formatDate(value, { month: "long", year: "numeric" })

export const formatDayMonth = (value) =>
  formatDate(value, { day: "2-digit", month: "2-digit" })


export const getInitials = (name) => {
  if (!name) return ""

  const words = name.trim().split(/\s+/)
  let initials = ""

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }

  return initials.toUpperCase()
}

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }))

  return chartData
}

export const prepareIncomeBarChartData = (data) => {
  const list = Array.isArray(data) ? data : []
  const sorted = [...list].sort((a, b) => new Date(a.date) - new Date(b.date))

  const grouped = new Map()
  sorted.forEach((item) => {
    const key = formatShortDate(item?.date)
    const amount = Number(item?.amount ?? 0)
    const current = grouped.get(key)

    if (current) current.amount += amount
    else grouped.set(key, { month: formatDayMonth(item?.date), amount })
  })

  return [...grouped.values()]
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: formatDayMonth(item?.date),
    amount: item?.amount,
    category: item?.category,
  }))

  return chartData
}

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}