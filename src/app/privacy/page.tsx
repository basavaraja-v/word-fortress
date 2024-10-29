import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from 'lucide-react'

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 py-8 px-4">
            <div className="container mx-auto">
                <Link href="/" className="inline-block mb-8">
                    <Button variant="outline">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Game
                    </Button>
                </Link>

                <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-300">Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            At Word Fortress, we are committed to protecting your privacy and ensuring the security of any personal information you provide while using our game. This Privacy Policy outlines our practices concerning the collection, use, and protection of your data.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Information We Collect</h2>
                        <p>
                            Word Fortress does not collect any personally identifiable information. We only store a small piece of data in your browser's local storage to remember if you've visited the game before, which helps us provide a better first-time user experience.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">How We Use Your Information</h2>
                        <p>
                            The information stored in your browser's local storage is used solely to enhance your gaming experience by determining whether to show the "How to Play" instructions on your first visit.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Data Security</h2>
                        <p>
                            We take appropriate measures to ensure the security of your information. As we do not collect or store any personal data on our servers, the risk of data breaches is minimal.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Third-Party Services</h2>
                        <p>
                            Word Fortress does not use any third-party services that collect user data.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at basavaraja@heyidb.com.
                        </p>

                        <p className="mt-4">
                            Last updated: March 15, 2024
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}