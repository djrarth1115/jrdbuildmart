import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = async () => {
      const base64Image = reader.result.replace(/^data:image\/[a-z]+;base64,/, '');

      const apiKey = 'AIzaSyC-njlw_gQNVngaB8wP45_nKbfSBmd-tcc'; // Replace this with your real API key

      try {
        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
          {
            method: 'POST',
            body: JSON.stringify({
              requests: [
                {
                  image: { content: base64Image },
                  features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
                }
              ]
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();

       // Basic list of food-related keywords (you can expand this!)
const foodKeywords = [
  // Fruits
  'apple', 'banana', 'mango', 'orange', 'grape', 'pineapple', 'watermelon',
  'lemon', 'lime', 'kiwi', 'papaya', 'peach', 'pear', 'plum', 'cherry',
  'strawberry', 'blueberry', 'raspberry', 'coconut', 'avocado', 'guava',
  'dragonfruit', 'jackfruit', 'durian', 'lychee', 'passionfruit', 'grapefruit',
  'cranberry', 'blackberry',

  // Vegetables
  'carrot', 'lettuce', 'spinach', 'cabbage', 'broccoli', 'cauliflower', 'kale',
  'onion', 'garlic', 'tomato', 'potato', 'sweet potato', 'eggplant', 'pepper',
  'zucchini', 'cucumber', 'bean', 'pea', 'corn', 'mushroom', 'radish',
  'turnip', 'beet', 'okra', 'asparagus', 'artichoke', 'leek', 'celery',

  // Meats and seafood
  'beef', 'pork', 'chicken', 'turkey', 'duck', 'goat', 'lamb', 'veal',
  'sausage', 'steak', 'ham', 'bacon', 'egg', 'egg yolk', 'egg white',
  'fish', 'salmon', 'tuna', 'shrimp', 'crab', 'lobster', 'mussels', 'oyster',
  'clam', 'squid', 'octopus', 'anchovy', 'sardine',

  // Plant-based proteins
  'tofu', 'tempeh', 'chickpea', 'lentil', 'soybean', 'black bean',
  'kidney bean', 'edamame', 'pea protein', 'seitan',

  // Grains and starches
  'rice', 'brown rice', 'white rice', 'bread', 'whole wheat bread',
  'noodle', 'pasta', 'spaghetti', 'macaroni', 'ramen', 'biscuit',
  'croissant', 'pancake', 'waffle', 'tortilla', 'cereal', 'oat', 'barley',
  'quinoa', 'cornbread', 'sushi', 'burrito', 'wrap', 'flatbread', 'naan',
  'pita', 'bagel', 'bun', 'roll', 'cracker', 'mochi', 'sticky rice',

  // Dairy and alternatives
  'milk', 'whole milk', 'skim milk', 'goat milk', 'almond milk', 'soy milk',
  'cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta', 'blue cheese',
  'yogurt', 'greek yogurt', 'butter', 'cream', 'whipped cream',
  'ice cream', 'sour cream',

  // Condiments and sauces
  'ketchup', 'mustard', 'mayonnaise', 'mayo', 'soy sauce', 'salsa',
  'hot sauce', 'chili sauce', 'barbecue sauce', 'bbq sauce', 'vinegar',
  'gravy', 'aioli', 'relish', 'sriracha', 'pesto', 'dressing',
  'tartar sauce', 'horseradish', 'curry sauce', 'teriyaki sauce',
  'hoisin sauce', 'hummus', 'guacamole', 'tahini', 'sweet and sour sauce',
  'cocktail sauce', 'wasabi', 'chimichurri', 'chutney', 'mustard sauce',
  'maple syrup', 'honey mustard', 'cheese sauce', 'garlic sauce', 'ranch',
  'blue cheese dressing', 'thousand island dressing', 'yogurt dip',
  'butter sauce', 'cream sauce', 'tomato sauce', 'lemon juice',
  'peanut sauce', 'plum sauce', 'fish sauce', 'corn syrup', 'vinaigrette',

  // Oils, spices, and seasonings
  'olive oil', 'canola oil', 'coconut oil', 'vegetable oil', 'sunflower oil',
  'salt', 'pepper', 'sugar', 'brown sugar', 'honey', 'flour', 'cornstarch',
  'baking powder', 'baking soda', 'yeast', 'ginger', 'cinnamon', 'nutmeg',
  'clove', 'cumin', 'paprika', 'turmeric', 'bay leaf', 'oregano', 'basil',
  'thyme', 'rosemary', 'sage', 'parsley', 'chili powder', 'five spice',
  'coriander', 'cardamom', 'dill', 'anise', 'cayenne', 'lemongrass',

  // Nuts and seeds
  'almond', 'cashew', 'peanut', 'pistachio', 'hazelnut', 'macadamia',
  'walnut', 'pecan', 'chia seed', 'flaxseed', 'sesame seed', 'sunflower seed',

  // Sweeteners and baking
  'syrup', 'molasses', 'honey', 'jelly', 'jam', 'vanilla extract',
  'chocolate', 'cocoa powder', 'caramel', 'marshmallow',

  // Desserts
  'cake', 'cookie', 'pie', 'brownie', 'cupcake', 'pudding', 'donut',
  'muffin', 'ice cream sandwich', 'crepe', 'eclair', 'fudge',

  // Beverages (optional)
  'milkshake', 'smoothie', 'coffee', 'tea', 'juice', 'orange juice',
  'apple juice', 'soda', 'cola', 'beer', 'wine', 'water', 'chocolate milk'

];

// Get raw labels
const rawLabels = data.responses[0].labelAnnotations.map((item) => item.description.toLowerCase());

// Filter labels that match food terms
const filteredLabels = rawLabels.filter(label =>
  foodKeywords.some(keyword => label.includes(keyword))
);

// Capitalize and remove duplicates
const uniqueLabels = [...new Set(filteredLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)))];

// Show filtered results
setIngredients(uniqueLabels);


      } catch (error) {
        alert('Error analyzing image');
        console.error(error);
      }

      setLoading(false);
    };
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>🍔 AI Food Ingredient Identifier</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="preview" style={{ width: 300, marginTop: 20 }} />}

      <div>
        <button onClick={handleAnalyze} style={{ marginTop: 20 }}>
          Analyze Ingredients
        </button>
      </div>

      {loading && <p>Analyzing image using Google Cloud Vision...</p>}

      {!loading && ingredients.length > 0 && (
        <div>
          <h2>Detected Items:</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

