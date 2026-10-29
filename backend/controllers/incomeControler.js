const User = require("../models/User")
const xlsx = require('xlsx')
const Income = require("../models/Income")


// Adiciona a renda
exports.addIncome = async (req, res, next) => {
    const userId = req.user.id

    try{
        const {icon, source, amount, date} = req.body

        // Validacao para campos em branco
        if (!amount || !source || !date) {
            return res.status(400).json({message: "Preencha todos os campos obrigatórios."})
        }    

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save()
        res.status(200).json(newIncome)

    } catch(error){
        res.status(500).json({message: "Erro interno no servidor."})
    }
}

// Pega toda a renda
exports.getAllIncome = async (req, res, next) => {
    const userId = req.user.id

    try{
        const income = await Income.find({userId}).sort({date: -1})
        res.json(income)
    } catch(error){
        res.status(500).json({message: "Erro interno no servidor."})
    }

}
// Deleta a renda
exports.deleteIncome = async (req, res, next) => {
    try{
        await Income.findByIdAndDelete(req.params.id)
        res.json({message: "Receita excluída com sucesso."})
    } catch(error) {
        res.status(500).json({message: "Erro interno no servidor."})
    }
}
// Download da renda em formato Excel
exports.downloadIncomeExcel = async (req, res, next) => {
    const userId = req.user.id
    try {
        const income = await Income.find({userId}).sort({date: -1})
        
        // Mapeamento corrigido
        const data = income.map(item => ({
            Fonte: item.source,
            Valor: item.amount,
            Data: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        
        // "utils" no plural corrigido
        xlsx.utils.book_append_sheet(wb, ws, "Receitas")
        
        xlsx.writeFile(wb, 'receitas.xlsx')
        res.download('receitas.xlsx')
    } catch (error) {
        res.status(500).json({message: "Erro interno no servidor."})
    }
}