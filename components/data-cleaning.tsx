"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

export default function DataCleaning() {
  const [inputText, setInputText] = useState(
    "Hello, World! This is an example text with numbers like 12345 and symbols like @#$%. There are   extra   spaces   too.",
  )
  const [cleanedText, setCleanedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [options, setOptions] = useState({
    removePunctuation: true,
    removeNumbers: true,
    removeExtraSpaces: true,
    removeSymbols: true,
  })

  const handleOptionChange = (option: keyof typeof options, value: boolean) => {
    setOptions((prev) => ({ ...prev, [option]: value }))
  }

  const cleanText = () => {
    setIsLoading(true)

    setTimeout(() => {
      try {
        let text = inputText

        if (options.removePunctuation) {
          text = text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        }

        if (options.removeNumbers) {
          text = text.replace(/\d+/g, "")
        }

        if (options.removeExtraSpaces) {
          text = text.replace(/\s+/g, " ").trim()
        }

        if (options.removeSymbols) {
          text = text.replace(/[^\w\s]/g, "")
        }

        setCleanedText(text)
      } catch (error) {
        console.error("Error cleaning text:", error)
      } finally {
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Cleaning</CardTitle>
          <CardDescription>Clean your text data by removing unwanted elements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cleaning">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cleaning">Cleaning Tools</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="cleaning" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to clean..."
                    className="min-h-[200px]"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remove-punctuation"
                        checked={options.removePunctuation}
                        onCheckedChange={(checked) => handleOptionChange("removePunctuation", checked as boolean)}
                      />
                      <Label htmlFor="remove-punctuation">Remove Punctuation</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remove-numbers"
                        checked={options.removeNumbers}
                        onCheckedChange={(checked) => handleOptionChange("removeNumbers", checked as boolean)}
                      />
                      <Label htmlFor="remove-numbers">Remove Numbers</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remove-extra-spaces"
                        checked={options.removeExtraSpaces}
                        onCheckedChange={(checked) => handleOptionChange("removeExtraSpaces", checked as boolean)}
                      />
                      <Label htmlFor="remove-extra-spaces">Remove Extra Spaces</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remove-symbols"
                        checked={options.removeSymbols}
                        onCheckedChange={(checked) => handleOptionChange("removeSymbols", checked as boolean)}
                      />
                      <Label htmlFor="remove-symbols">Remove Symbols</Label>
                    </div>
                  </div>

                  <Button onClick={cleanText} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cleaning...
                      </>
                    ) : (
                      "Clean Text"
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label>Cleaned Text</Label>
                  <div className="p-4 border rounded-md bg-muted min-h-[200px] whitespace-pre-wrap">
                    {cleanedText || "Cleaned text will appear here"}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">What was removed:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {options.removePunctuation && cleanedText && <li>Punctuation marks (., !, ?, etc.)</li>}
                      {options.removeNumbers && cleanedText && <li>Numeric digits (0-9)</li>}
                      {options.removeExtraSpaces && cleanedText && <li>Extra whitespace</li>}
                      {options.removeSymbols && cleanedText && <li>Special symbols (@, #, $, etc.)</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Remove Punctuation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">Before:</p>
                        <p className="text-sm">Hello, world! How are you today?</p>
                      </div>
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">After:</p>
                        <p className="text-sm">Hello world How are you today</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Removes all punctuation marks like commas, periods, exclamation marks, etc.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Remove Numbers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">Before:</p>
                        <p className="text-sm">There are 42 apples and 17 oranges.</p>
                      </div>
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">After:</p>
                        <p className="text-sm">There are apples and oranges.</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Removes all numeric digits from the text.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Remove Extra Spaces</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">Before:</p>
                        <p className="text-sm">This text has too many spaces.</p>
                      </div>
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">After:</p>
                        <p className="text-sm">This text has too many spaces.</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Replaces multiple consecutive spaces with a single space.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Remove Symbols</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">Before:</p>
                        <p className="text-sm">Email: user@example.com #hashtag $price</p>
                      </div>
                      <div className="p-2 border rounded-md bg-muted">
                        <p className="text-sm font-medium">After:</p>
                        <p className="text-sm">Email userexamplecom hashtag price</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Removes special symbols like @, #, $, etc.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Python Code for Text Cleaning</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
                    {`import re

def clean_text(text, remove_punctuation=True, remove_numbers=True, 
               remove_extra_spaces=True, remove_symbols=True):
    """
    Clean text by removing unwanted elements
    
    Parameters:
    -----------
    text : str
        Input text to clean
    remove_punctuation : bool, default=True
        Whether to remove punctuation
    remove_numbers : bool, default=True
        Whether to remove numbers
    remove_extra_spaces : bool, default=True
        Whether to remove extra spaces
    remove_symbols : bool, default=True
        Whether to remove symbols
        
    Returns:
    --------
    str
        Cleaned text
    """
    if not text:
        return ""
    
    # Make a copy of the original text
    cleaned_text = text
    
    # Remove punctuation
    if remove_punctuation:
        cleaned_text = re.sub(r'[.,\\/#!$%\\^&\\*;:{}=\\-_\`~()]', '', cleaned_text)
    
    # Remove numbers
    if remove_numbers:
        cleaned_text = re.sub(r'\\d+', '', cleaned_text)
    
    # Remove extra spaces
    if remove_extra_spaces:
        cleaned_text = re.sub(r'\\s+', ' ', cleaned_text).strip()
    
    # Remove symbols
    if remove_symbols:
        cleaned_text = re.sub(r'[^\\w\\s]', '', cleaned_text)
    
    return cleaned_text

# Example usage
text = "Hello, World! This is an example text with numbers like 12345 and symbols like @#$%. There are   extra   spaces   too."
cleaned = clean_text(text)
print(cleaned)
`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

