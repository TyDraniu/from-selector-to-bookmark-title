Works with FF57 and later.

With update to 57 you have to set your options again. Sorry.

1. Bookmark your favourite webpage with fast-changing data (e.g. stocks) and put it on the Bookmarks Toolbar
2. Use the Developer > Inspector to find out the unique selector of data you want to observe
3. Install the add-on
4. In the Add-on Manager go to the add-on's Options
5. Set your preferences

Exemplary preferences

http://money.cnn.com/data/markets/
SPAN[data-ticker-name="Nasdaq"][class="ticker-name-change"] > .posData

http://www.bankier.pl/gielda/notowania/indeksy-gpw
table.sortTable:nth-child(3) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(4)

https://indices-globalmarkets.bnpparibas.com/product.aspx?id=4lWJxGH4k1jBgdLsFB7sSQ==
#ctl00_MainContentPlaceholder_ucSubProduct_divClosingprice

http://mozillapl.org/forum/index.php
#page-body > P:last-child > STRONG:first-child