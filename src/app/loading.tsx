import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const GlobalLoading = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card principale avec skeleton */}
                    <Card className="col-span-full">
                        <CardHeader className="space-y-3">
                            <Skeleton className="h-8 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-center">
                                <Skeleton className="h-16 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                            <Skeleton className="h-4 w-2/3 mx-auto" />
                        </CardContent>
                    </Card>

                    {/* Cards secondaires avec skeletons */}
                    {[1, 2, 3].map((index) => (
                        <Card key={index} className="p-4">
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="pt-2">
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Section liste avec skeletons */}
                    <Card className="col-span-full p-6">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-1/4" />
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-3 w-2/3" />
                                    </div>
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Message de chargement */}
                <div className="text-center mt-8 space-y-2">
                    <Skeleton className="h-5 w-48 mx-auto" />
                    <Skeleton className="h-3 w-32 mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default GlobalLoading;