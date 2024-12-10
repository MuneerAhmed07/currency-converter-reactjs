import SelectBox from "./SelectBox";
import { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFormCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(false);
    const [error, setError] = useState("");

    console.log(convertedAmount);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response  = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/USD`
                )
                setCurrencies(Object.keys(response.data.rates));
                setError("");
            } catch(error) {
                setError("Failed to fetch currencies. Please try again");
            }
        }

        fetchCurrencies()
    }, []);

    const handleConversion = async () => {
        if(fromCurrency && toCurrency) {
            try{
                const response = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
                )
                const rate = response.data.rates[toCurrency];
                setConvertedAmount((amount * rate).toFixed(2))
            }catch(error) {
                setError("failed to convert. please try again");
            }
        }else {
            setError("Please select both currencies")
        }
    }

  return (
    <>
        <div className="app-container">
            <h1>Currency Converter APp</h1>

            <div className="converter">
                <div className="input-group">
                    <label>From:</label>
                    <SelectBox
                        options={currencies}
                        selectedValue= {fromCurrency}
                        onChange={(e) => setFormCurrency(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>To:</label>
                    <SelectBox 
                        options={currencies}
                        selectedValue= {toCurrency}
                        onChange={(e) =>setToCurrency(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Amount:</label>
                    <input type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button onClick={handleConversion}>Convert</button>
            </div>

            {
                convertedAmount  && (
                    <p>
                        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                    </p>
                )
            }
            {error && <p className="error">{error}</p>}
        </div> 
    </>
  )
}

export default CurrencyConverter;
