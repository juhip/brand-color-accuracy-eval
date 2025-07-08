"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Zap,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  X,
  Settings,
  FileText,
  BarChart3,
  MessageSquare,
  Clock,
  Edit,
  Trash2,
  UserPlus,
  Bell,
} from "lucide-react"

const BRAND_COLORS = {
  Adobe: { primary: "#ED1C24", secondary: "#1473E6", name: "Adobe Red" },
  "Coca-Cola": { primary: "#FF0000", secondary: "#FFFFFF", name: "Classic Red" },
  Nike: { primary: "#FF6900", secondary: "#000000", name: "Orange Blaze" },
  "McDonald's": { primary: "#FFC72C", secondary: "#FF0000", name: "Golden Yellow" },
  Starbucks: { primary: "#00704A", secondary: "#FFFFFF", name: "Forest Green" },
  Facebook: { primary: "#1877F2", secondary: "#FFFFFF", name: "Facebook Blue" },
  Twitter: { primary: "#1DA1F2", secondary: "#FFFFFF", name: "Twitter Blue" },
  Spotify: { primary: "#1DB954", secondary: "#000000", name: "Spotify Green" },
  Netflix: { primary: "#E50914", secondary: "#000000", name: "Netflix Red" },
}

const AI_MODELS = [
  { id: "firefly", name: "Adobe Firefly", icon: "🔥" },
  { id: "dalle", name: "DALL-E 3", icon: "🎨" },
  { id: "midjourney", name: "Midjourney", icon: "🌟" },
  { id: "stable-diffusion", name: "Stable Diffusion", icon: "⚡" },
]

// Mock evaluation results
const MOCK_RESULTS = {
  firefly: { accuracy: 92, deviation: 2.3, status: "compliant" },
  dalle: { accuracy: 87, deviation: 4.1, status: "marginal" },
  midjourney: { accuracy: 78, deviation: 7.8, status: "off-brand" },
  "stable-diffusion": { accuracy: 85, deviation: 5.2, status: "marginal" },
}

// Mock collaborators
const MOCK_COLLABORATORS = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@adobe.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "marcus.r@adobe.com",
    role: "Evaluator",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "offline",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Emily Watson",
    email: "emily.watson@adobe.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    lastActive: "5 min ago",
  },
]

// Mock analytics data
const MOCK_ANALYTICS = {
  totalEvaluations: 247,
  avgAccuracy: 86.4,
  topPerformingModel: "Adobe Firefly",
  trendsData: [
    { month: "Oct", firefly: 89, dalle: 82, midjourney: 75, stable: 81 },
    { month: "Nov", firefly: 91, dalle: 85, midjourney: 77, stable: 83 },
    { month: "Dec", firefly: 92, dalle: 87, midjourney: 78, stable: 85 },
  ],
  categoryPerformance: [
    { category: "Product Ads", firefly: 94, dalle: 89, midjourney: 82, stable: 87 },
    { category: "Social Media", firefly: 91, dalle: 86, midjourney: 79, stable: 84 },
    { category: "Print Materials", firefly: 89, dalle: 84, midjourney: 75, stable: 82 },
    { category: "Web Banners", firefly: 93, dalle: 88, midjourney: 81, stable: 86 },
  ],
}

export default function BrandColorEvaluationTool() {
  const [selectedBrand, setSelectedBrand] = useState("Adobe")
  const [customColors, setCustomColors] = useState([{ id: 1, color: "#ED1C24", label: "Primary" }])
  const [colorMode, setColorMode] = useState("brands")
  const [prompt, setPrompt] = useState("Create a professional product advertisement featuring our brand colors")
  const [tolerance, setTolerance] = useState([5])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [activeTab, setActiveTab] = useState("evaluation")
  const [uploadedBrands, setUploadedBrands] = useState<any[]>([])
  const [humanEvaluations, setHumanEvaluations] = useState<{
    [key: string]: {
      brandAlignment: number
      visualQuality: number
      clarity: number
      usability: number
      comments: string
      evaluator: string
    }
  }>({})
  const [selectedEvaluator, setSelectedEvaluator] = useState("current-user")
  const [skipHumanEval, setSkipHumanEval] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setHasResults(true)
    }, 3000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate file parsing
      const mockParsedBrands = [
        { name: "Custom Brand A", primary: "#FF5733", secondary: "#33FF57" },
        { name: "Custom Brand B", primary: "#3357FF", secondary: "#FF3357" },
      ]
      setUploadedBrands(mockParsedBrands)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "marginal":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "off-brand":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800 border-green-200"
      case "marginal":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "off-brand":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const currentBrandColors = selectedBrand ? BRAND_COLORS[selectedBrand as keyof typeof BRAND_COLORS] : null

  const updateHumanEvaluation = (modelId: string, criteria: string, value: number) => {
    setHumanEvaluations((prev) => ({
      ...prev,
      [modelId]: {
        ...prev[modelId],
        [criteria]: value,
        evaluator: selectedEvaluator,
      },
    }))
  }

  const updateEvaluationComments = (modelId: string, comments: string) => {
    setHumanEvaluations((prev) => ({
      ...prev,
      [modelId]: {
        ...prev[modelId],
        comments,
        evaluator: selectedEvaluator,
      },
    }))
  }

  const getAverageHumanScore = (modelId: string) => {
    const evaluation = humanEvaluations[modelId]
    if (!evaluation) return 0
    const scores = [
      evaluation.brandAlignment,
      evaluation.visualQuality,
      evaluation.clarity,
      evaluation.usability,
    ].filter((score) => score > 0)
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Collaborators */}
        <div className="bg-red-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Adobe Brand Color Accuracy Evaluation Tool</h1>
              <p className="mt-2 opacity-90">Comprehensive AI model evaluation platform for enterprise teams</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {MOCK_COLLABORATORS.slice(0, 3).map((collaborator) => (
                  <Avatar key={collaborator.id} className="border-2 border-white">
                    <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Button variant="outline" size="sm" className="ml-2 bg-white text-red-600 hover:bg-gray-50">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Invite
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Single Evaluation Tab */}
          <TabsContent value="evaluation" className="space-y-6">
            {/* Brand Color Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Select Brand Color Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={colorMode} onValueChange={setColorMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="brands">Search Brands</TabsTrigger>
                    <TabsTrigger value="custom">Custom Colors</TabsTrigger>
                    <TabsTrigger value="upload">Upload Guidelines</TabsTrigger>
                  </TabsList>

                  <TabsContent value="brands" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand-select">Select Brand</Label>
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a brand..." />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(BRAND_COLORS).map(([brand, colors]) => (
                              <SelectItem key={brand} value={brand}>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: colors.primary }} />
                                  {brand}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {currentBrandColors && (
                        <div className="space-y-2">
                          <Label>Brand Colors</Label>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <div
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: currentBrandColors.primary }}
                              />
                              <div>
                                <div className="text-sm font-medium">{currentBrandColors.name}</div>
                                <div className="text-xs text-gray-500">{currentBrandColors.primary}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <div
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: currentBrandColors.secondary }}
                              />
                              <div>
                                <div className="text-sm font-medium">Secondary</div>
                                <div className="text-xs text-gray-500">{currentBrandColors.secondary}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="custom" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Custom Brand Colors</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (customColors.length < 4) {
                              setCustomColors([
                                ...customColors,
                                {
                                  id: Date.now(),
                                  color: "#000000",
                                  label: `Color ${customColors.length + 1}`,
                                },
                              ])
                            }
                          }}
                          disabled={customColors.length >= 4}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Color ({customColors.length}/4)
                        </Button>
                      </div>

                      <div className="grid gap-3">
                        {customColors.map((colorItem, index) => (
                          <div key={colorItem.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div
                              className="w-8 h-8 rounded border cursor-pointer flex-shrink-0"
                              style={{ backgroundColor: colorItem.color }}
                              onClick={() => {
                                const input = document.createElement("input")
                                input.type = "color"
                                input.value = colorItem.color
                                input.onchange = (e) => {
                                  const newColors = customColors.map((c) =>
                                    c.id === colorItem.id ? { ...c, color: (e.target as HTMLInputElement).value } : c,
                                  )
                                  setCustomColors(newColors)
                                }
                                input.click()
                              }}
                            />
                            <Input
                              value={colorItem.color}
                              onChange={(e) => {
                                const newColors = customColors.map((c) =>
                                  c.id === colorItem.id ? { ...c, color: e.target.value } : c,
                                )
                                setCustomColors(newColors)
                              }}
                              placeholder="#FF0000"
                              className="w-24 font-mono text-sm"
                            />
                            <Input
                              value={colorItem.label}
                              onChange={(e) => {
                                const newColors = customColors.map((c) =>
                                  c.id === colorItem.id ? { ...c, label: e.target.value } : c,
                                )
                                setCustomColors(newColors)
                              }}
                              placeholder="Color label"
                              className="flex-1"
                            />
                            {customColors.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setCustomColors(customColors.filter((c) => c.id !== colorItem.id))
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 border rounded bg-gray-50">
                        <div className="text-sm text-gray-600 mb-2">Color Palette Preview</div>
                        <div className="flex gap-2 flex-wrap">
                          {customColors.map((colorItem) => (
                            <div key={colorItem.id} className="text-center">
                              <div
                                className="w-12 h-12 rounded border mb-1"
                                style={{ backgroundColor: colorItem.color }}
                              />
                              <div className="text-xs text-gray-600">{colorItem.label}</div>
                              <div className="text-xs font-mono text-gray-500">{colorItem.color}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-6">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <div className="space-y-2">
                        <p className="text-lg font-medium">Upload Brand Guidelines</p>
                        <p className="text-gray-600">Support formats: PDF, CSV, JSON, TXT</p>
                      </div>
                      <div className="mt-4">
                        <Input
                          type="file"
                          accept=".pdf,.csv,.json,.txt"
                          onChange={handleFileUpload}
                          className="max-w-xs mx-auto"
                        />
                      </div>
                    </div>

                    {/* Parsing Preview */}
                    {uploadedBrands.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Parsed Brand Data</h4>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">Brand Name</th>
                                <th className="px-4 py-2 text-left">Primary Color</th>
                                <th className="px-4 py-2 text-left">Secondary Color</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {uploadedBrands.map((brand, index) => (
                                <tr key={index} className="border-t">
                                  <td className="px-4 py-2">{brand.name}</td>
                                  <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-4 h-4 rounded border"
                                        style={{ backgroundColor: brand.primary }}
                                      />
                                      {brand.primary}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-4 h-4 rounded border"
                                        style={{ backgroundColor: brand.secondary }}
                                      />
                                      {brand.secondary}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="flex gap-1">
                                      <Button variant="outline" size="sm">
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Import {uploadedBrands.length} Brands</Button>
                        </div>
                      </div>
                    )}

                    {/* Format Examples */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium mb-2">CSV Format Example</h5>
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                          {`Brand Name,Primary Color,Secondary Color
Adobe,#ED1C24,#1473E6
Nike,#FF6900,#000000`}
                        </pre>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium mb-2">JSON Format Example</h5>
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                          {`{
"brands": [
  {
    "name": "Adobe",
    "primary": "#ED1C24",
    "secondary": "#1473E6"
  }
]
}`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Enter Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Describe the marketing image you want to generate</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Create a professional product advertisement featuring our brand colors"
                    className="min-h-20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label>Color Tolerance: ±{tolerance[0]}%</Label>
                    <Slider value={tolerance} onValueChange={setTolerance} max={15} min={1} step={1} className="w-48" />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={
                      isGenerating ||
                      (!selectedBrand && colorMode === "brands") ||
                      (colorMode === "custom" && customColors.length === 0)
                    }
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate & Compare
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Model Comparison Display */}
            {(hasResults || isGenerating) && (
              <Card>
                <CardHeader className="bg-red-600">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5" />
                    Model Comparison Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-red-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {AI_MODELS.map((model) => (
                      <div key={model.id} className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl mb-1">{model.icon}</div>
                          <h3 className="font-semibold text-gray-900">{model.name}</h3>
                        </div>

                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          {isGenerating ? (
                            <div className="animate-pulse text-gray-400">Generating...</div>
                          ) : (
                            <img
                              src={`/placeholder.svg?height=200&width=200&text=${model.name}`}
                              alt={`${model.name} generated image`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>

                        {hasResults && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white">Accuracy</span>
                              <span className="font-semibold text-white">
                                {MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].accuracy}%
                              </span>
                            </div>

                            <Progress
                              value={MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].accuracy}
                              className="h-2"
                            />

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white">Deviation</span>
                              <span className="text-sm text-white">
                                ±{MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].deviation}%
                              </span>
                            </div>

                            <Badge
                              variant="outline"
                              className={`w-full justify-center ${getStatusColor(MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status)}`}
                            >
                              {getStatusIcon(MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status)}
                              <span className="ml-1 capitalize">
                                {MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status}
                              </span>
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {hasResults && (
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          👤 Human Evaluation
                        </h4>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={skipHumanEval}
                              onChange={(e) => setSkipHumanEval(e.target.checked)}
                              className="rounded"
                            />
                            Skip if AI results are satisfactory
                          </label>
                          <Select value={selectedEvaluator} onValueChange={setSelectedEvaluator}>
                            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="current-user">You (Current User)</SelectItem>
                              {MOCK_COLLABORATORS.map((collaborator) => (
                                <SelectItem key={collaborator.id} value={collaborator.email}>
                                  {collaborator.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {!skipHumanEval && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {AI_MODELS.map((model) => (
                            <div key={model.id} className="bg-white/10 rounded-lg p-4 space-y-4">
                              <div className="text-center">
                                <h5 className="font-medium text-white mb-2">{model.name}</h5>
                                <div className="text-sm text-white/80">
                                  Combined Score:{" "}
                                  {(
                                    (MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].accuracy +
                                      getAverageHumanScore(model.id) * 20) /
                                    2
                                  ).toFixed(1)}
                                  %
                                </div>
                              </div>

                              <div className="space-y-3">
                                {/* Brand Alignment */}
                                <div>
                                  <Label className="text-white text-sm">Brand Alignment</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Slider
                                      value={[humanEvaluations[model.id]?.brandAlignment || 0]}
                                      onValueChange={(value) =>
                                        updateHumanEvaluation(model.id, "brandAlignment", value[0])
                                      }
                                      max={5}
                                      min={0}
                                      step={1}
                                      className="flex-1"
                                    />
                                    <span className="text-white text-sm w-8">
                                      {humanEvaluations[model.id]?.brandAlignment || 0}/5
                                    </span>
                                  </div>
                                </div>

                                {/* Visual Quality */}
                                <div>
                                  <Label className="text-white text-sm">Visual Quality</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Slider
                                      value={[humanEvaluations[model.id]?.visualQuality || 0]}
                                      onValueChange={(value) =>
                                        updateHumanEvaluation(model.id, "visualQuality", value[0])
                                      }
                                      max={5}
                                      min={0}
                                      step={1}
                                      className="flex-1"
                                    />
                                    <span className="text-white text-sm w-8">
                                      {humanEvaluations[model.id]?.visualQuality || 0}/5
                                    </span>
                                  </div>
                                </div>

                                {/* Clarity */}
                                <div>
                                  <Label className="text-white text-sm">Clarity & Readability</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Slider
                                      value={[humanEvaluations[model.id]?.clarity || 0]}
                                      onValueChange={(value) => updateHumanEvaluation(model.id, "clarity", value[0])}
                                      max={5}
                                      min={0}
                                      step={1}
                                      className="flex-1"
                                    />
                                    <span className="text-white text-sm w-8">
                                      {humanEvaluations[model.id]?.clarity || 0}/5
                                    </span>
                                  </div>
                                </div>

                                {/* Usability */}
                                <div>
                                  <Label className="text-white text-sm">Marketing Usability</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Slider
                                      value={[humanEvaluations[model.id]?.usability || 0]}
                                      onValueChange={(value) => updateHumanEvaluation(model.id, "usability", value[0])}
                                      max={5}
                                      min={0}
                                      step={1}
                                      className="flex-1"
                                    />
                                    <span className="text-white text-sm w-8">
                                      {humanEvaluations[model.id]?.usability || 0}/5
                                    </span>
                                  </div>
                                </div>

                                {/* Comments */}
                                <div>
                                  <Label className="text-white text-sm">Comments & Notes</Label>
                                  <Textarea
                                    value={humanEvaluations[model.id]?.comments || ""}
                                    onChange={(e) => updateEvaluationComments(model.id, e.target.value)}
                                    placeholder="Add your evaluation notes, concerns, or recommendations..."
                                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-20"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Summary of Human Evaluations */}
                      {Object.keys(humanEvaluations).length > 0 && !skipHumanEval && (
                        <div className="mt-6 p-4 bg-white/10 rounded-lg">
                          <h5 className="font-medium text-white mb-3">Human Evaluation Summary</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {AI_MODELS.filter((model) => humanEvaluations[model.id]).map((model) => {
                              const evaluation = humanEvaluations[model.id]
                              const avgScore = getAverageHumanScore(model.id)
                              return (
                                <div key={model.id} className="text-center">
                                  <div className="text-sm text-white/80">{model.name}</div>
                                  <div className="text-lg font-semibold text-white">{avgScore.toFixed(1)}/5.0</div>
                                  <div className="text-xs text-white/60">
                                    {evaluation.comments ? "📝 Has notes" : "No comments"}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Evaluation Results */}
            {hasResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Ranking
                    </span>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export Report
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {AI_MODELS.sort((a, b) => {
                      const aAiScore = MOCK_RESULTS[a.id as keyof typeof MOCK_RESULTS].accuracy
                      const bAiScore = MOCK_RESULTS[b.id as keyof typeof MOCK_RESULTS].accuracy
                      const aHumanScore = getAverageHumanScore(a.id) * 20 // Convert to percentage
                      const bHumanScore = getAverageHumanScore(b.id) * 20
                      const aCombined =
                        Object.keys(humanEvaluations).length > 0 && !skipHumanEval
                          ? (aAiScore + aHumanScore) / 2
                          : aAiScore
                      const bCombined =
                        Object.keys(humanEvaluations).length > 0 && !skipHumanEval
                          ? (bAiScore + bHumanScore) / 2
                          : bAiScore
                      return bCombined - aCombined
                    }).map((model, index) => {
                      const aiScore = MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].accuracy
                      const humanScore = getAverageHumanScore(model.id) * 20
                      const combinedScore =
                        Object.keys(humanEvaluations).length > 0 && !skipHumanEval
                          ? (aiScore + humanScore) / 2
                          : aiScore
                      const hasHumanEval =
                        humanEvaluations[model.id] && getAverageHumanScore(model.id) > 0 && !skipHumanEval

                      return (
                        <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{model.icon}</span>
                              <div>
                                <div className="font-semibold">{model.name}</div>
                                <div className="text-sm text-gray-600">
                                  AI: {aiScore}% accuracy
                                  {hasHumanEval && (
                                    <span className="ml-2">
                                      • Human: {humanScore.toFixed(1)}% • Combined: {combinedScore.toFixed(1)}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <Progress value={combinedScore} className="w-24 h-2 mb-1" />
                              <div className="text-xs text-gray-500">{hasHumanEval ? "Combined Score" : "AI Only"}</div>
                            </div>
                            <Badge
                              variant="outline"
                              className={getStatusColor(MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status)}
                            >
                              {getStatusIcon(MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status)}
                              <span className="ml-1 capitalize">
                                {MOCK_RESULTS[model.id as keyof typeof MOCK_RESULTS].status}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-red-600">
                    <h4 className="font-semibold mb-2 text-white">Recommendation</h4>
                    <p className="text-sm text-white">
                      Based on the current evaluation with ±{tolerance[0]}% tolerance, <strong>Adobe Firefly</strong>{" "}
                      shows the highest brand color accuracy at 92% with minimal deviation.
                      {!skipHumanEval && Object.keys(humanEvaluations).length > 0 && (
                        <span> Human evaluators also rated it highly for brand alignment and visual quality.</span>
                      )}{" "}
                      Consider this model for brand-critical marketing materials.
                    </p>
                    {!skipHumanEval && Object.keys(humanEvaluations).length > 0 && (
                      <div className="mt-2 text-xs text-white/80">
                        💡 Tip: Human evaluation helps capture subjective brand elements that AI metrics might miss.
                      </div>
                    )}
                    {skipHumanEval && (
                      <div className="mt-2 text-xs text-white/80">
                        ⚡ Human evaluation skipped - using AI metrics only for faster results.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Evaluations</p>
                      <p className="text-2xl font-bold">{MOCK_ANALYTICS.totalEvaluations}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Accuracy</p>
                      <p className="text-2xl font-bold">{MOCK_ANALYTICS.avgAccuracy}%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Top Model</p>
                      <p className="text-lg font-bold">{MOCK_ANALYTICS.topPerformingModel}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Brands</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Use Case</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_ANALYTICS.categoryPerformance.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-red-600">Firefly: {category.firefly}%</span>
                          <span className="text-blue-600">DALL-E: {category.dalle}%</span>
                          <span className="text-purple-600">Midjourney: {category.midjourney}%</span>
                          <span className="text-green-600">Stable: {category.stable}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-1 h-2">
                        <div className="bg-red-500 rounded" style={{ opacity: category.firefly / 100 }} />
                        <div className="bg-blue-500 rounded" style={{ opacity: category.dalle / 100 }} />
                        <div className="bg-purple-500 rounded" style={{ opacity: category.midjourney / 100 }} />
                        <div className="bg-green-500 rounded" style={{ opacity: category.stable / 100 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_ANALYTICS.trendsData.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1 grid grid-cols-4 gap-2">
                        <div className="text-center">
                          <div className="text-sm text-red-600">{month.firefly}%</div>
                          <Progress value={month.firefly} className="h-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-blue-600">{month.dalle}%</div>
                          <Progress value={month.dalle} className="h-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-purple-600">{month.midjourney}%</div>
                          <Progress value={month.midjourney} className="h-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-green-600">{month.stable}%</div>
                          <Progress value={month.stable} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Collaborators Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Member
              </Button>
            </div>

            <div className="grid gap-4">
              {MOCK_COLLABORATORS.map((collaborator) => (
                <Card key={collaborator.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{collaborator.name}</div>
                          <div className="text-sm text-gray-600">{collaborator.email}</div>
                          <div className="text-xs text-gray-500">Last active: {collaborator.lastActive}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={collaborator.status === "online" ? "default" : "secondary"}>
                          {collaborator.status}
                        </Badge>
                        <Badge variant="outline">{collaborator.role}</Badge>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Sarah Chen</strong> completed evaluation for Adobe brand guidelines
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Marcus Rodriguez</strong> uploaded new brand guidelines for "Tech Startup"
                      </p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Emily Watson</strong> provided human evaluation feedback
                      </p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
