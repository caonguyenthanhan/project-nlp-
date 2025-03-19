"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Loader2, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"

export default function DataCollection() {
  const t = useTranslations("dataCollection")
  const common = useTranslations("common")

  const [url, setUrl] = useState("https://www.imdb.com/search/title/?groups=top_100&sort=user_rating,desc")
  const [isLoading, setIsLoading] = useState(false)
  const [scrapedData, setScrapedData] = useState<any[]>([])
  const [selectedDataset, setSelectedDataset] = useState("imdb")
  const [csvContent, setCsvContent] = useState("")

  const handleScrape = () => {
    setIsLoading(true)

    setTimeout(() => {
      try {
        // Simulate web scraping based on the selected dataset
        if (selectedDataset === "imdb") {
          // Simulate IMDB movie data
          const mockImdbData = [
            { title: "The Shawshank Redemption", rating: "9.3", year: "1994", director: "Frank Darabont" },
            { title: "The Godfather", rating: "9.2", year: "1972", director: "Francis Ford Coppola" },
            { title: "The Dark Knight", rating: "9.0", year: "2008", director: "Christopher Nolan" },
            { title: "The Godfather Part II", rating: "9.0", year: "1974", director: "Francis Ford Coppola" },
            { title: "12 Angry Men", rating: "9.0", year: "1957", director: "Sidney Lumet" },
            { title: "Schindler's List", rating: "8.9", year: "1993", director: "Steven Spielberg" },
            {
              title: "The Lord of the Rings: The Return of the King",
              rating: "8.9",
              year: "2003",
              director: "Peter Jackson",
            },
            { title: "Pulp Fiction", rating: "8.9", year: "1994", director: "Quentin Tarantino" },
            {
              title: "The Lord of the Rings: The Fellowship of the Ring",
              rating: "8.8",
              year: "2001",
              director: "Peter Jackson",
            },
            { title: "The Good, the Bad and the Ugly", rating: "8.8", year: "1966", director: "Sergio Leone" },
          ]
          setScrapedData(mockImdbData)

          // Generate CSV content
          const headers = "Title,Rating,Year,Director\n"
          const rows = mockImdbData
            .map((movie) => `"${movie.title}","${movie.rating}","${movie.year}","${movie.director}"`)
            .join("\n")
          setCsvContent(headers + rows)
        } else if (selectedDataset === "books") {
          // Simulate books.toscrape.com data
          const mockBooksData = [
            { title: "A Light in the Attic", price: "£51.77", availability: "In stock", rating: "Three" },
            { title: "Tipping the Velvet", price: "£53.74", availability: "In stock", rating: "One" },
            { title: "Soumission", price: "£50.10", availability: "In stock", rating: "One" },
            { title: "Sharp Objects", price: "£47.82", availability: "In stock", rating: "Four" },
            {
              title: "Sapiens: A Brief History of Humankind",
              price: "£54.23",
              availability: "In stock",
              rating: "Five",
            },
            { title: "The Requiem Red", price: "£22.65", availability: "In stock", rating: "One" },
            {
              title: "The Dirty Little Secrets of Getting Your Dream Job",
              price: "£33.34",
              availability: "In stock",
              rating: "Four",
            },
            {
              title: "The Coming Woman: A Novel Based on the Life of the Infamous Feminist, Victoria Woodhull",
              price: "£17.93",
              availability: "In stock",
              rating: "Three",
            },
            {
              title: "The Boys in the Boat: Nine Americans and Their Epic Quest for Gold at the 1936 Berlin Olympics",
              price: "£22.60",
              availability: "In stock",
              rating: "Four",
            },
            { title: "The Black Maria", price: "£52.15", availability: "In stock", rating: "One" },
          ]
          setScrapedData(mockBooksData)

          // Generate CSV content
          const headers = "Title,Price,Availability,Rating\n"
          const rows = mockBooksData
            .map((book) => `"${book.title}","${book.price}","${book.availability}","${book.rating}"`)
            .join("\n")
          setCsvContent(headers + rows)
        }
      } catch (error) {
        console.error("Error scraping data:", error)
      } finally {
        setIsLoading(false)
      }
    }, 2000)
  }

  const downloadCSV = () => {
    if (!csvContent) return

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${selectedDataset}_data.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="webscraping">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="webscraping">{t("webScraping")}</TabsTrigger>
              <TabsTrigger value="publicdata">{t("publicData")}</TabsTrigger>
              <TabsTrigger value="code">{t("code")}</TabsTrigger>
            </TabsList>

            <TabsContent value="webscraping" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataset-select">{t("selectDataset")}</Label>
                    <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                      <SelectTrigger id="dataset-select">
                        <SelectValue placeholder={t("selectDataset")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imdb">IMDB Top Movies</SelectItem>
                        <SelectItem value="books">Books to Scrape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url-input">{t("url")}</Label>
                    <Input id="url-input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t("url")} />
                  </div>

                  <Button onClick={handleScrape} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("scraping")}
                      </>
                    ) : (
                      t("scrapeData")
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t("scrapedData")}</Label>
                    {scrapedData.length > 0 && (
                      <Button variant="outline" size="sm" onClick={downloadCSV}>
                        <Download className="h-4 w-4 mr-2" />
                        {t("downloadCSV")}
                      </Button>
                    )}
                  </div>

                  {scrapedData.length > 0 ? (
                    <div className="border rounded-md overflow-x-auto max-h-[400px]">
                      <table className="min-w-full">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            {Object.keys(scrapedData[0]).map((key) => (
                              <th key={key} className="px-4 py-2 text-left font-medium">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {scrapedData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                              {Object.values(item).map((value, i) => (
                                <td key={i} className="px-4 py-2 border-t">
                                  {value as string}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground border rounded-md">{t("scrapedData")}</div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Các TabsContent khác giữ nguyên, chỉ thay đổi text bằng t('key') */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

