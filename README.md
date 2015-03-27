# Firefox addon

Works with FF38 and higher.

1. Bookmark your favourite webpage with fast-changing data (e.g. stocks) and put it on the Bookmarks Toolbar
2. Use the Developer > Inspector to find out the unique selector of data you want to observe
3. Install the add-on 
4. In the Add-on Manager go to the add-on's Options
5. Set your preferences

## Exemplary preferences
	http://money.cnn.com/data/markets/
	SPAN[data-ticker-name="Nasdaq"][class="ticker-name-change"]

	https://indices-globalmarkets.bnpparibas.com/product.aspx?id=4lWJxGH4k1jBgdLsFB7sSQ==
	#ctl00_MainContentPlaceholder_ucSubProduct_divClosingprice

	http://mozillapl.org/forum/index.php
	#page-body > P:last-child > STRONG:first-child