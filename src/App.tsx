import React from 'react';
import { useProperties } from './hooks/useProperties';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterSection } from './components/FilterSection';
import { PropertyGrid } from './components/PropertyGrid';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AIAssistant } from './components/AIAssistant';
import { GovernoratesSection } from './components/GovernoratesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { Footer } from './components/Footer';
import { Governorate } from './types/property';

export const App: React.FC = () => {
  const {
    properties,
    loading,
    filters,
    updateFilter,
    resetFilters,
    selectedProperty,
    isDetailModalOpen,
    openPropertyDetail,
    closePropertyDetail,
  } = useProperties();

  const handleHeroSearchSubmit = () => {
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegionSelect = (gov: Governorate, region: string) => {
    updateFilter('governorate', gov);
    updateFilter('region', region);
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAIAssistant = () => {
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* Fixed Header */}
      <Header onOpenAI={handleOpenAIAssistant} />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <HeroSection
          searchQuery={filters.searchQuery}
          contractType={filters.contractType}
          governorate={filters.governorate}
          onSearchChange={(q) => updateFilter('searchQuery', q)}
          onContractTypeChange={(ct) => updateFilter('contractType', ct)}
          onGovernorateChange={(gov) => updateFilter('governorate', gov)}
          onRegionSelect={(r) => updateFilter('region', r)}
          onSearchSubmit={handleHeroSearchSubmit}
        />

        {/* Filter Section */}
        <FilterSection
          filters={filters}
          onUpdateFilter={updateFilter}
          onResetFilters={resetFilters}
          resultCount={properties.length}
        />

        {/* Property Cards Grid */}
        <PropertyGrid
          properties={properties}
          loading={loading}
          onOpenDetail={openPropertyDetail}
          onResetFilters={resetFilters}
        />

        {/* AI Assistant Component */}
        <AIAssistant onOpenDetail={openPropertyDetail} />

        {/* Regional Governorates Explorer */}
        <GovernoratesSection onSelectGovernorateAndRegion={handleRegionSelect} />

        {/* Why Choose Us Trust Signals */}
        <WhyUsSection />

      </main>

      {/* Footer */}
      <Footer onSelectRegion={handleRegionSelect} />

      {/* Interactive Lightbox Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={closePropertyDetail}
      />

    </div>
  );
};

export default App;
