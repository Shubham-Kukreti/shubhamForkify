const express  = require('express');
const app = express();
const server  = require('http').createServer(app);
const socketIO=require('socket.io');
let bodyParser = require('body-parser');
let crypto = require('crypto-js');
let mongoClient=require('mongodb').MongoClient;

var io=socketIO(server);



//mongo connectivity
var mongoUrl= "mongodb://localhost:27017/"

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

//mongo DB functions
// insertOne
// findOne
// updateOne
// deleteOne


let user=['Shubham']
let password=['12345678']
const myKey="forkify"

// let recipeData={
//      'Jalapeno Popper Grilled Cheese Sandwich':{
//           'ingredients':`4 oz. cream cheese, softened
//           1 jalapeño, finely chopped (seeded if desired)
//           1 tsp. garlic powder
//           kosher salt
//           finely ground black pepper
//           4 slices french bread
//           2 c. shredded Cheddar
//           4 slices cooked bacon, halved`,
     
//      'preparation':`Preheat oven to 375 degrees.
//      Stuff each jalapeno half with approximately 1 ounce of cream cheese. Bake stuffed jalapenos on cookie sheet for 25-30 minutes. ...
//      Place 1 slice each cheddar cheese on 2 bread slices. Place 1 slice each Monterey Jack on 2 bread slices. ...
//      Top each sandwich with several pats of butter`

//      }

//      ,
//     'Perfect Iced Coffee':{
//       'ingredients':`1 pound Ground Coffee (good, Rich Roast)
//       8 quarts Cold Water
//       Half-and-half (healthy Splash Per Serving)
//       Sweetened Condensed Milk (2-3 Tablespoons Per Serving)
//       Note: Can Use Skim Milk, 2%% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!`
//       ,
//       'preparation':`In a large container, mix ground coffee with water. Cover and allow to sit at room temperature twelve hours or overnight. 

//       Line a fine mesh strainer with cheesecloth and set over a pitcher or other container. Pour coffee/water mixture through the strainer, allowing all liquid to run through. Discard grounds. 
      
//       Place coffee liquid in the fridge and allow to cool. Use as needed. 
      
//       To make iced coffee, pack a glass full of ice cubes. Fill glass 2/3 full with coffee liquid. Add healthy splash of half-and-half. Add 2-3 tablespoons sweetened condensed milk (can use plain sugar instead) and stir to combine. Taste and adjust half-and-half and/or sweetened condensed milk as needed.`
//     } ,

//     'Crash Hot Potatoes':{
//          'ingredients':`12 whole New Potatoes (or Other Small Round Potatoes)
//          3 Tablespoons Olive Oil
//          Kosher Salt To Taste
//          Black Pepper To Taste
//          Rosemary (or Other Herbs Of Choice) To Taste
//          Parmesan, Finely Grated`
//           ,

//           'preparation':`In a medium saucepan over medium heat, boil the potatoes in lightly salted water until fork-tender, about 12 minutes.
//           Preheat the oven to 475 degrees F.
//           Place the potatoes on a baking sheet. Using a potato masher, gently press down to mash each one. The tops of the potatoes should be really textured.
//           `

//     },

//     'Stovetop Avocado Mac and Cheese':{
//           'ingredients':`10 ounces dry elbow macaroni
//           2 cloves garlic minced
//           2 avocados peeled and pitted
//           2 tablespoons fresh lime juice
//           1/3 cup chopped fresh cilantro
//           Salt and pepper to taste
//           2 tablespoons butter
//           2 tablespoons all-purpose flour
//           1 cup milk
//           2 cups shredded Pepper Jack cheese
//           Salt and pepper to taste
//           Fresh avocado chunks for garnish, if desired`
//           ,

//           'preparation':`Place avocados in a medium bowl and add lemon juice to prevent browning. Mash until smooth.
//           In a large pot or saucepan, melt butter. Sprinkle in flour and cook until slightly golden, 2 to 3 minutes. Pour in milk and whisk until combined. Season with salt and pepper. Let simmer until it starts to thicken, about 5 minutes.
//           Turn off heat and add mashed avocado and cheeses to pot. Whisk until smooth. Add pasta and stir until fully coated in cheese sauce. Season again with salt and pepper if needed. Top with chopped avocado and serve.`

//     },

//     'Buffalo Chicken Grilled Cheese Sandwich':{
//          'ingredients':`2 large boneless skinless chicken breasts, cooked and shredded
//          1/3 cup buffalo sauce
//          8 slices GO Veggie Sriracha Deli Slices (or regular cheddar cheese)
//          8 slices bread
//          2-3 tablespoons butter or a non-dairy butter spread, at room temperature`,
//          'preparation':`In a bowl, combine shredded chicken with buffalo sauce.
//          Spread butter on one side of each slice of bread.
//          On unbuttered side of four slices, place 1/4 of the chicken.
//          Top chicken with 2 slices of cheese, then remaining slices of bread, buttered side up.
//          Heat a large skillet over medium heat.`
//     },

//     'Cinnamon Rolls':{
//          'ingredients':` and 3/4 cups (345g) all-purpose flour (spoon & leveled)
//          1/4 cup (50g) granulated sugar
//          1 teaspoon salt
//          2 and 1/4 teaspoons Red Star Platinum Yeast or any instant yeast (1 packet)
//          1/2 cup (120ml) milk
//          1/4 cup (60ml) water
//          3 Tablespoons unsalted butter
//          1 large egg`,
//          'preparation':`Preheat oven to 400 degrees F (200 degrees C). ...
//          Whisk flour, 2 tablespoons white sugar, baking powder, and salt together in a large bowl. ...
//          Turn dough out onto a floured work surface and roll dough into a 1/4-inch thick rectangle. ...
//          Whisk 1/2 cup white sugar, brown sugar, and cinnamon together in a small bowl.
//           `},

//           'Best Pizza Dough Ever':{
//                'ingredients':`4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled
//                1 3/4 (.44 ounce) teaspoons salt
//                1 teaspoon (.11 ounce) instant yeast
//                1/4 cup (2 ounces) olive oil (optional)
//                1 3/4 cups (14 ounces) water, ice cold (40°F)
//                Semolina flour OR cornmeal for dusting`,
//                'preparation':`Combine 1 cup (125g) of flour, instant yeast, sugar, and salt in a large bowl. If desired, add garlic powder and dried basil at this point as well. Add olive oil and warm water and use a wooden spoon to stir well very well. Gradually add another 1 cup (125g) of flour.`
//           },

//           'Magic Sauce':{
//                'ingredients':`1/2 cup extra-virgin olive oil
//                1 teaspoon fresh rosemary leaves
//                1 teaspoon fresh thyme leaves
//                1 teaspoon fresh oregano leaves
//                2 teaspoons sweet paprika
//                2 medium cloves of garlic, smashed into a paste
//                1 well-crumbled bay leaf
//                pinch of red pepper flakes
//                1/4+ teaspoon fine grain sea salt
//                1 tablespoon fresh lemon juice`,
//                'preparation':`Gently warm the olive oil over medium-low heat in a skillet or pan, until it is just hot. When hot remove from heat.
//                While the oil is heating, lightly pound the rosemary, thyme, and oregano in a mortar and pestle.
//                Stir the paprika, garlic, bay leaf, red pepper flakes, and salt into the oil. Then add the bruised herbs and lemon juice.
//                You can use this now, but know - the oil just gets better as it ages over a few days. Keep it in a refrigerator for up to a week/ten days-ish. It thickens up when cold, so if you need it in a liquid state, place it in the sun or in a warm place for a few minutes.`
//           },
//           'Spicy Dr Pepper Shredded Pork':{
//                'ingredients':`1 whole Large Onion.
//                1 whole Pork Shoulder ("pork Butt") - 5 To 7 Pounds.
//                Salt And Freshly Ground Black Pepper.
//                1 can (11 Ounce) Chipotle Peppers In Adobo Sauce.
//                2 cans Dr. Pepper.
//                2 Tablespoons Brown Sugar.`,
//                'preparation':`
//                In a heavy-bottomed pan over medium-high heat, brown the pork on all sides. Transfer the roast to the slow cooker. Return the pan to the stove.
               
                
//                Pour Dr Pepper into the pan and deglaze, using a spatula to scrape up all the pork bits on the bottom. Let cook for 2 minutes, scraping the bottom occasionally.
               
//                Pour the Dr Pepper over the meat in the slow cooker. Add honey, balsamic vinegar, salt, and pepper. Stir well. Cover and cook on low for 7 hours.
               
               
//                After the meat has cooked for 7 hours, drain off any excess liquid and shred the meat into small bits with two forks. Add the barbecue sauce to the pork and stir well. Cover the slow cooker and cook for 1 more hour.
               
               
//                Add more salt and pepper to taste. Fill the burger buns with pork and serve immediately.
               
//                `},

//                'Parmesan Roasted Potatoes':{
//                     'ingredients':`1.8kg floury potatoes

//                     , cut in half, or quarters if large
//                     5 tbsp olive oil
                    
//                     2 tsp plain flour
//                     100g parmesan
                    
//                      (or vegetarian alternative), finely grated
//                     handful parsley
                    
//                     , finely chopped
//                     4 rosemary
                    
//                      sprigs, leaves finely chopped
//                     pinch of grated nutmeg`,
//                     'preparation':`Place potatoes in a bowl and drizzle with 1 tablespoon vegetable oil; toss until potatoes are lightly coated. Sprinkle potatoes with Parmesan cheese mixture; toss to coat. Arrange potatoes, cut-side down, onto the prepared baking pan. Bake in the preheated oven for 15 to 20 minutes.`
//                },
          
//           'Bacon Wrapped Jalapeno Popper Stuffed Chicken':{
//                'ingredients':`4 (6 ounce) chicken breasts, butterflied or pounded thin
//                salt and pepper to taste
//                2 tablespoons roasted jalapenos (or fresh, or pickled), diced
//                1/4 cup cream cheese
//                1/4 cup monterey jack or cheddar cheese, shredded
//                8 slices bacon`,
//                'preparation':`Lay the chicken flat, season both sides with salt and pepper, place 1/4 of the mixture of the jalapeños, cream cheese, and cheddar on the chicken and roll them up. Wrap each chicken breast up to 2 slices of bacon and place them in a baking dish. Bake in a pre-heated 400°F oven until cooked, about 25 to 35 minutes.`
//           },
//           'The Best Chocolate Cake':{
//                'ingredients':`1 ½ cups flour (185 g)
//                1 cup dutch processed cocoa powder (120 g)
//                1 ½ teaspoons baking soda.
//                ½ teaspoon baking powder.
//                1 ½ cups stout (360 mL)
//                1 tablespoon vanilla extract.
//                1 tablespoon espresso powder.
//                1 cup butter (235 g)`,
//                'preparation':`Preheat oven to 350 degrees. Butter three 9-inch cake rounds. Dust with flour and tap out the excess.
//                Mix together flour, sugar, cocoa, baking soda, baking powder, and salt in a stand mixer using a low speed until combined.
//                Add eggs, buttermilk, warm water, oil, and vanilla. Beat on a medium speed until smooth. This should take just a couple of minutes.
//                Divide batter among the three pans. I found that it took just over 3 cups of the batter to divide it evenly.
//                Bake for 30-35 minutes until a toothpick inserted into the center comes out clean.
//                Cool on wire racks for 15 minutes and then turn out the cakes onto the racks and allow to cool completely.
//                Frost with your favorite frosting and enjoy!`
//           },
//           'Hot Spinach and Artichoke Dip':{
//                'ingredients':`1 (14-ounce) jar artichoke hearts, drained and chopped
//                2 cups chopped fresh baby spinach or 1 (10-ounce) package frozen chopped spinach, thawed and drained
//                1 (8-ounce) package cream cheese, softened
//                ½ cup sour cream, mayonnaise, or whole milk Greek yogurt
//                2 cups grated Parmesan cheese, divided
//                1 teaspoon Stone House Seasoning`,
//                'preparation':`Preheat oven to 350º F. Mix all ingredients together, reserving 1/2 cup Parmesan cheese for topping, until well combined and pour into a shallow baking dish. Bake for 20 minutes. Serve warm with chips.`
//           },
//           'Smashed Chickpea & Avocado Salad Sandwich':{
//                'ingredients':`1 15 ounce can chickpeas or garbanzo beans
//                1 large ripe avocado
//                1/4 cup fresh cilantro chopped
//                2 tablespoons chopped green onion
//                Juice from 1 lime
//                Salt and pepper to taste
//                Bread of your choice I use whole wheat bread
//                Fresh spinach leaves or other sandwich toppings: lettuce tomato slices, sprouts, etc.
//               `,
//                'preparation':`In a medium bowl, using a fork or potato masher smash the chickpeas and avocado together. Add in cilantro, green onion, and lime juice. Season with salt and pepper, to taste. Spread salad on bread and top with your favorite sandwich toppings`
//           },
//           'Restaurant Style Salsa':{
//                'ingredients':`Two 10-ounce cans diced tomatoes and green chiles, such as Rotel

//                One 28-ounce can whole tomatoes with juice 
               
//                1/2 cup fresh cilantro leaves (or more to taste!)
               
//                1/4 cup chopped onion
               
//                1 clove garlic, minced
               
//                1 whole jalapeno, quartered and sliced thin, with seeds and membrane 
               
//                1/4 teaspoon ground cumin
               
//                1/4 teaspoon salt
               
//                1/4 teaspoon sugar
               
//                1/2 whole lime, juiced`,
//                'preparation':`Combine the diced tomatoes, whole tomatoes, cilantro, onions, garlic, jalapeno, cumin, salt, sugar and lime juice in a blender or food processor. (This is a very large batch. ...
//                     Pulse until you get the salsa to the consistency you'd like. ...
//                     Refrigerate the salsa for at least an hour before serving.
//                     `
//           },

//           'The Best Lasagna Ever':{
//                'ingredients':`1 pound sweet Italian sausage.
//                1 pound lean ground beef.
//                1 large white onion minced.
//                5 cloves garlic crushed.
//                1 28 ounce can crushed tomatoes.
//                2 6 ounce can tomato paste.
//                1 15 oz can tomato sauce.
//                1/2 cup chicken broth.`,
//                'preparation':`Season with sugar, basil, fennel seeds, Italian seasoning, 1 teaspoon salt, pepper, and 2 tablespoons parsley. Simmer, covered, for about 1 1/2 hours, stirring occasionally. Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes.`
//           },

//           'Mac and Cheese with Roasted Chicken, Goat Cheese, and Rosemary':{
//                'ingredients':`1 tablespoon vegetable oil.
//                1 pound dried rigatoni.
//                1 quart heavy cream.
//                2 tablespoons chopped fresh rosemary.
//                1 clove fresh garlic, crushed.
//                8 ounces goat cheese.
//                2 cups shredded roasted chicken.
//                salt and pepper to taste.`,
               
//                'preparation':`1. Place a large pot of salted water over high heat and bring to a rapid boil. Add the oil and rigatoni to the water and cook according to the directions on the package, 10-12 minutes.
//                2. While you are waiting for the water to boil, pour the cream into a large sauce pan over medium heat. Add the rosemary and garlic to the cream and bring it to a simmer - take care not to let it boil over. Allow the cream to reduce by about half.
//                3. Stir in the goat cheese and chicken and continue cooking cooking it till the cream coats the back of a spoon.
//                4. Thoroughly drain the pasta. Add the pasta to the sauce. Coat the pasta in the sauce and simmer over low heat for a few minutes. Serve hot.`
//           },

//           'Guinness Chocolate Cheesecake':{
//                'ingredients':`1 cup graham cracker crumbs (gluten-free for gluten-free)
//                2 tablespoons cocoa powder
//                1 tablespoon sugar
//                2 tablespoons butter, melted
//                12 ounces dark chocolate, chopped
//                2 tablespoons heavy cream
//                3 (8 ounce) packages cream cheese
//                1 cup sugar
//                1/2 cup sour cream
//                3 eggs
//                1 teaspoon vanilla extract
//                3/4 cup Guinness`,
//                'preparation':`Mix the graham cracker crumbs, cocoa powder, sugar, and butter and press into the bottom of a 9 inch spring form pan.
//                Melt the chocolate in the cream in a double boiler.
//                Cream the cream cheese.
//                Mix in the sugar, chocolate, sour cream, eggs, vanilla, and Guinness.
//                Pour the mixture into the spring form pan.
//                Bake in a preheated 350F/180C oven for 60 minutes.
//                Turn off heat and leave cheesecake in the oven with the door slightly ajar for 60 minutes.
//                Let it cool completely.
//                Chill the cheesecake in the fridge overnight.`
//           },
//           'Banana Bread':{
//                'ingredients':`2 to 3 very ripe bananas, peeled (about 1 1/4 to 1 1/2 cups mashed)
//                1/3 cup melted butter, unsalted or salted.
//                1 teaspoon baking soda.
//                Pinch of salt.
//                3/4 cup sugar (1/2 cup if you would like it less sweet, 1 cup if more sweet)
//                1 large egg, beaten.
//                1 teaspoon vanilla extract.
//                1 1/2 cups of all-purpose flour.`,
//                'preparation':`1 Preheat the oven to 350°F (175°C), and butter a 4x8-inch loaf pan.

//                2 In a mixing bowl, mash the ripe bananas with a fork until completely smooth. Stir the melted butter into the mashed bananas.
               
//                3 Mix in the baking soda and salt. Stir in the sugar, beaten egg, and vanilla extract. Mix in the flour.
               
//                4 Pour the batter into your prepared loaf pan. Bake for 50 minutes to 1 hour at 350°F (175°C), or until a tester inserted into the center comes out clean.
               
//                5 Remove from oven and let cool in the pan for a few minutes. Then remove the banana bread from the pan and let cool completely before serving. Slice and serve. (A bread knife helps to make slices that aren't crumbly.)`
//           },
//           'The Best Rolled Sugar Cookies':{
//                'ingredients':`1 1⁄2 cup butter, softened
//                2 cup white sugar
//                4 egg
//                1 tsp vanilla extract
//                5 cup all-purpose flour
//                2 tsp baking powder
//                1 tsp salt`,
//                'preparation':`In a large bowl, cream together butter and sugar until smooth. Beat in eggs and vanilla. Stir in the flour, baking powder, and salt. ...
//                Preheat oven to 400 degrees F (200 degrees C). Roll out dough on floured surface 1/4 to 1/2 inch thick. ...
//                Bake 6 to 8 minutes in preheated oven. Cool completely.`
//           },
//           'Guacamole Grilled Cheese Sandwich':{
//                'ingredients':`2 ripe avocados
//                1/2 small onion minced
//                1 clove garlic minced
//                1 small jalapeño stems and seeds removed, minced
//                2 tablespoons cilantro leaves finely chopped
//                1 tablespoon of fresh lime juice
//                1/2 teaspoon coarse salt
//                A dash of freshly grated black pepper
//                1 Roma tomato chopped`,
//                'preparation':`Spread desired amount of guacamole on both slices of bread then top with cheese. Butter outer slices of bread and grill on one side for about 2 minutes or until golden and crispy. Flip the sandwich and grill until golden brown.`
//           },
//           'Two-Ingredient Banana Peanut Butter Ice Cream':{
//                'ingredients':`4 large very ripe bananas
//                2 tablespoons peanut butter`,
//                'preparation':`Peel bananas and slice into 1/2 inch discs. Arrange banana slices in a single layer on a large plate or baking sheet. Freeze for 1-2 hours.
//                Place the banana slices in a food processor or powerful blender. Puree banana slices, scraping down the bowl as needed. Puree until the mixture is creamy and smooth. Add the peanut butter and puree to combine. Serve immediately for soft-serve ice cream consistency. If you prefer harder ice cream, place in the freezer for a few hours and then serve.
//                *Note-if you have a hard time creating a creamy consistency, you can add 1-2 tablespoons of milk to help puree the banana slices. Make sure you use a powerful food processor or blender!`
//           },
//           'Easy Shepherd’s Pie':{
//                'ingredients':`1
//                lb lean (at least 80%) ground beef
//                1/2
//                cup chopped onion
//                2
//                teaspoons finely chopped garlic
//                1
//                bag (16 oz) frozen mixed vegetables (3 1/2 cups)
//                1/2
//                teaspoon dried thyme leaves
//                3/4
//                teaspoon salt
//                1/4
//                teaspoon pepper
//                2 1/2
//                cups Progresso™ beef flavored broth (from 32-oz carton)
//                3
//                tablespoons Gold Medal™ all-purpose flour
//                1
//                pouch (4.7 oz) Betty Crocker™ creamy butter mashed potatoes
//                Water, butter and milk called for on mashed potato pouch
//                1
//                cup shredded Cheddar cheese (4 oz)
//                1/4
//                cup chopped Italian (flat-leaf) parsley
//                Paprika, if desired`,
//                'preparation':`In 12-inch skillet, cook beef, onion and garlic over medium-high heat 4 to 5 minutes, stirring frequently, until beef is no longer pink; drain. Stir in frozen mixed vegetables, thyme, salt and pepper.
               
//                In 4-cup glass measuring cup, add broth and flour, beating with whisk to combine. Add broth mixture to skillet; heat to boiling. Cook 8 to 10 minutes over medium-high heat, stirring occasionally, until mixture is slightly thickened.
               
//                Meanwhile, make mashed potatoes as directed on pouch; stir in cheese until melted and 2 tablespoons of the parsley.
               
//                To serve, divide beef mixture among bowls; top with potatoes. Sprinkle with paprika; garnish with remaining 2 tablespoons parsley.`
//           },
//           'Buffalo Chicken Chowder':{
//                'ingredients':`2 tablespoons butter
//                1 onion, diced
//                2 carrots, diced
//                2 stalks celery, diced
//                2 cloves garlic, chopped
//                1/4 cup flour (rice flour for gluten free)
//                3 cups chicken broth or chicken stock
//                1 pound cooked chicken, diced or shredded
//                hot sauce to taste (I used 1/4 cup Franks Red Hot sauce)
//                1 large yukon gold or other boiling potato, peeled and cut into bite sized pieces
//                salt and pepper to taste
//                1 cup heavy cream
//                1/4 cup blue cheese, crumbled`,
//                'preparation':`Melt the butter in a large sauce pan over medium-high heat, add the onion, carrots and celery and cook until tender, about 8-10 minutes.
//                Add the garlic and cook until fragrant, about a minute.
//                Mix in the flour and let it cook for 2-3 minutes.
//                Add the chicken broth, chicken, hot sauce and potatoes, bring to a boil, reduce the heat and simmer until the potatoes are tender, about 10-15 minutes.
//                Season with salt and pepper, mix in the cream and blue cheese and remove from heat when the cheese has melted.`
//           },
//           'Best Brownies':{
//                'ingredients':`1/2 cup + 2 tablespoons salted butter melted
//                1 cup granulated sugar
//                2 large eggs
//                2 teaspoons vanilla extract
//                1/2 cup melted milk chocolate chips
//                3/4 cup all-purpose flour
//                1/4 cup unsweetened cocoa powder
//                1/2 teaspoon salt
//                1 cup milk chocolate chips`,
//                'preparation':`Preheat oven to 350 degrees F. Line a metal 9x9 pan with parchment paper.
//                Pour melted butter into a large mixing bowl. Whisk in sugar by hand until smooth, 30 seconds.
//                Add in eggs and vanilla extract. Whisk 1 minute.
//                Whisk in melted chocolate until combined and smooth.
//                Use a rubber spatula to stir in flour, cocoa powder, and salt until just combined. Stir in whole chocolate chips.
//                Pour into prepared pan and smooth out.
//                Bake in the preheated oven for 30 minutes. Let cool in pan 30 minutes before slicing.`
//           },
//           'Slow Cooker Chicken Tortilla Soup':{
//                'ingredients':`1/2 cup white onion diced
//                1/2 cup red bell pepper diced
//                1 cup frozen corn
//                1 15 ounce can black beans rinsed and drained
//                1 1/4 lbs boneless skinless chicken breasts
//                1 4 ounce can mild green chilies
//                1 8 ounce can tomato sauce
//                1 14.5 ounce can diced tomatoes do not drain
//                2 teaspoons chili powder
//                1 teaspoon cumin
//                1/2 teaspoon garlic powder
//                6 cups chicken broth
//                1 teaspoon kosher salt
//                2 tablespoons cilantro leaves chopped
//                1 cup tortilla strips or more if desired
//                Toppings such as sour cream, avocado, olives and shredded cheese`,
//                'preparation':`Place the onion, bell pepper, corn, black beans, chicken, chilies, tomato sauce, tomatoes, chili powder, cumin, garlic powder, chicken broth and salt into a slow cooker. Stir to combine. Cover and cook on LOW for 6-8 hours or HIGH for 3-4 hours. Remove the chicken breasts from the pot and shred with two forks.`
//           },
//           'Banana Crumb Muffins':{
//                'ingredients':`1 1/2 cups all-purpose flour
//                1 teaspoon baking soda
//                1 teaspoon baking powder
//                1/2 teaspoon salt
//                3 bananas , mashed (about 1 1/2 cups)
//                3/4 cup white sugar
//                1 egg , lightly beaten
//                1/3 cup butter , melted
//                1 teaspoon vanilla
//                1 teaspoon cinnamon
//                1/2 teaspoon nutmeg`,
//                'preparation':`Preheat oven to 375 degrees F (190 degrees C). Lightly grease 10 muffin cups, or line with muffin papers.
//                In a large bowl, mix together 1 1/2 cups flour, baking soda, baking powder and salt. In another bowl, beat together bananas, sugar, egg, vanilla, cinnamon, nutmeg and melted butter. Stir the banana mixture into the flour mixture just until moistened. Spoon batter into prepared muffin cups.
//                For the crumb topping: In a small bowl, mix together brown sugar, 1/4 cup flour and 1/2 teaspoon cinnamon. Cut in 2 tablespoons butter until mixture resembles wet sand. You can use your hands too to incorporate the mixture. Sprinkle topping over muffins.
//                Bake in preheated oven for 15 to 20 minutes, until a toothpick inserted into center of a muffin comes out clean.`
//           },
//           'Banana Banana Bread':{
//                'ingredients':`2 to 3 very ripe bananas, peeled (about 1 1/4 to 1 1/2 cups mashed)
//                1/3 cup melted butter, unsalted or salted.
//                1 teaspoon baking soda.
//                Pinch of salt.
//                3/4 cup sugar (1/2 cup if you would like it less sweet, 1 cup if more sweet)
//                1 large egg, beaten.
//                1 teaspoon vanilla extract.
//                1 1/2 cups of all-purpose flour.`,
//                'preparation':`1 Preheat the oven to 350°F (175°C), and butter a 4x8-inch loaf pan.

//                2 In a mixing bowl, mash the ripe bananas with a fork until completely smooth. Stir the melted butter into the mashed bananas.
               
//                3 Mix in the baking soda and salt. Stir in the sugar, beaten egg, and vanilla extract. Mix in the flour.
               
//                4 Pour the batter into your prepared loaf pan. Bake for 50 minutes to 1 hour at 350°F (175°C), or until a tester inserted into the center comes out clean.
               
//                5 Remove from oven and let cool in the pan for a few minutes. Then remove the banana bread from the pan and let cool completely before serving. Slice and serve. (A bread knife helps to make slices that aren't crumbly.)`
//           },
//           'Nikki':{
//                'ingredients':`3 large ripe bananas, well mashed (about 1 1/2 cups)
//                1 teaspoon vanilla extract
//                1/4 cup coconut oil barely warm - so it isn't solid (or alternately, olive oil)
//                2 cups rolled oats
//                2/3 cup almond meal
//                1/3 cup coconut finely shredded & unsweetened
//                1/2 teaspoon cinnamon
//                1/2 teaspoon fine grain sea salt
//                1 teaspoon baking powder
//                6 - 7 ounces chocolate chips or dark chocolate bar chopped`,
//                'preparation':`In a large bowl combine the bananas, vanilla extract, and coconut oil. Set aside. In another bowl whisk together the oats, almond meal, shredded coconut, cinnamon, salt, and baking powder. Add the dry ingredients to the wet ingredients and stir until combined. Fold in the chocolate chunks/chips. The dough is a bit looser than a standard cookie dough, don't worry about it. 

//                Drop dollops of the dough, each about 2 teaspoons in size, an inch apart, onto a parchment (or Silpat) lined baking sheet. Bake for 12 - 14 minutes. I baked these as long as possible without burning the bottoms and they were perfect - just shy of 15 minutes seems to be about right in my oven.`
//           },
//           'Zesty Slow Cooker Chicken Barbeque':{
//                'ingredients':`6 frozen boneless, skinless chicken breast, halves
//                1 bottle (12 ounce) barbecue sauce
//                1⁄2 cup Italian salad dressing
//                1⁄4 cup brown sugar
//                2 tbsp Worcestershire sauce`,
//                'preparation':`Place chicken in a slow cooker. In a bowl, mix the barbecue sauce, Italian salad dressing, brown sugar, and Worcestershire sauce. Pour over the chicken.
//                Cover and cook 3 to 4 hours on High or 6 to 8 hours on Low.`
//           }
//      }

app.post('/login',(req,res)=>{
     mongoClient.connect(mongoUrl,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('Forkify');
          dbo.collection('User').findOne({Email:req.body.userEmail,Password:req.body.userPassword},(err,result)=>{
              
               if(err) throw err;  
    
               else if(result==null){
          
                    res.send({'token':'invalid'}) 
          }

                else{
                    var token=new Date().getDate()+myKey;
                    var token2=crypto.SHA256(token).toString();
                     res.send({'token':token2});
          
     }
          })
     })
})

app.post('/verifyToken',(req,res)=>{
     var todayToken=crypto.SHA256(new Date().getDate()+myKey).toString();

     if(req.body.token==todayToken){
          res.send({'status':'valid'})
     }
     else{
          res.send({'status':'invalid'})
     }
})


app.post('/signup',(req,res)=>{
     
     mongoClient.connect(mongoUrl,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('Forkify');
          dbo.collection('User').findOne({Email:req.body.email},(err,result)=>{
               
               if(err) throw err;
              
               else if(result==null){
                    dbo.collection('User').insert({FirstName:req.body.firstN,LastName:req.body.lastN,Email:req.body.email,Password:req.body.passwordS},(err,result)=>{
                         if(err) throw err;
                         res.send({'value':'registered'})
                    })
                    
               }
               
               else{
                   // console.log("You have already registered");
                   res.send({'value':'already'})
               }

              

          })
          
     })

})

// mongoClient.connect(mongoUrl,(err,db)=>{
//      if(err) throw err;
//      var dbo=db.db('Forkify');
//      dbo.collection('content').insertOne({Recipe:recipeData},(err,result)=>{
//           if(err) throw err;
//      })
// })

app.post('/sendData',(req,res)=>{
     mongoClient.connect(mongoUrl,(err,db)=>{
               if(err) throw err;
               var dbo=db.db('Forkify');
               dbo.collection('content').findOne({},(err,result)=>{
                    if(err) throw err;
                    res.send(result.Recipe[req.body.rname])
               })
          })
          
          // res.send(result)
})



// io.on('connection',(socket)=>{

// });

// io.emit('newCustomer',"Lisen to Me");

server.listen(5000,(req,res)=>{
    console.log("server is listening to port number 5000")
  })
  