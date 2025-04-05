import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VerifyPage from "./pages/VerifyPage";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import FlipCard from './components/FlipCard';
import ValidatedForm from './components/ValidatedForm';
import Accordion from './components/Accordion';
import StickyFooter from './components/StickyFooter';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <ScrollProgress />
    <BackToTop />
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Interactive UI Components</h1>
      
      {/* Flip Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Flip Card</h2>
        <div className="flex justify-center">
          <FlipCard
            frontContent={
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Front Side</h3>
                <p>Hover to see the back</p>
              </div>
            }
            backContent={
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Back Side</h3>
                <p>This is the back of the card</p>
              </div>
            }
          />
        </div>
      </section>

      {/* Form Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Validated Form</h2>
        <ValidatedForm />
      </section>

      {/* Accordion Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accordion Menu</h2>
        <Accordion items={accordionItems} />
      </section>

      {/* Parallax Section */}
      <section className="mb-12 h-96 parallax" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)' }}>
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-4xl font-bold text-white">Parallax Effect</h2>
        </div>
      </section>
    </main>
    <StickyFooter />
  </QueryClientProvider>
);

const accordionItems = [
  {
    title: 'Section 1',
    content: 'This is the content for section 1. It can contain any React components or text.',
  },
  {
    title: 'Section 2',
    content: 'This is the content for section 2. You can add more sections as needed.',
  },
  {
    title: 'Section 3',
    content: 'This is the content for section 3. Each section can have different content.',
  },
];

export default App;
