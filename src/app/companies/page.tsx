'use client';
import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import RootLayout from '../layout';
import BackToTopButton from '@/components/ui/back-to-top';
import FloatingNav from '@/components/ui/floating-navbar';
import {
  ClockIcon,
  HomeIcon,
  MegaphoneIcon,
  PhoneArrowUpRightIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { ICompany } from '@/interfaces/ICompanies';
import { sendGTMEvent } from '@next/third-parties/google';
import { getDataFromAggregatedCompanyDoc } from '@/services/aggregatedCompanyData.service';
import { CompanyCard } from '@/components/ui/registered-company-card';

// Navigation items component
const navItms = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'Timeline',
    link: '/#timeline',
    icon: <ClockIcon />,
  },
  {
    name: 'Sponsors',
    link: '/#sponsors',
    icon: <MegaphoneIcon />,
  },
  {
    name: 'Reach Us',
    link: '/#reach_us',
    icon: <PhoneArrowUpRightIcon />,
  },
  {
    name: 'Registered Companies',
    link: '/companies',
    icon: <BuildingOfficeIcon />,
  },
];

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => (
  <div className="mt-8 mb-6 max-w-md mx-auto">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
        placeholder="Search by company, department, or job type..."
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <span className="text-gray-400 hover:text-gray-500">✕</span>
        </button>
      )}
    </div>
  </div>
);

const NoResults = () => (
  <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
    <p className="text-gray-600 dark:text-gray-400">
      No companies found matching your search criteria.
    </p>
  </div>
);

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendGTMEvent({
      event: 'page view',
      page: 'companies',
      path: window.location.pathname,
    });

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getDataFromAggregatedCompanyDoc();

        if (!data || !data.companies) {
          throw new Error('Failed to fetch company data');
        }

        // order by company name
        data.companies.sort((a, b) =>
          a.name
            .trim()
            .toLowerCase()
            .localeCompare(b.name.trim().toLowerCase(), 'en', { sensitivity: 'base' }),
        );

        console.log(
          ` ${data.companies[0]} > ${data.companies[1]} :  ${data.companies[0].name.toLowerCase().localeCompare(data.companies[1].name.toLowerCase())}`,
        );

        setCompanies(data.companies);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load company data. Please try again later.');
        sendGTMEvent({
          event: 'JS_Error',
          error_name: 'AggregatedCompanyDocLoadError',
          error: err,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter companies based on search query
  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;

    const query = searchQuery.toLowerCase();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.preferredFields.some((field) => field.toLowerCase().includes(query)) ||
        company.qualitiesToLook.some((quality) => quality.toLowerCase().includes(query)) ||
        company.availableJobTypes?.some((type) => type.toLowerCase().includes(query)) ||
        company.description.toLowerCase().includes(query),
    );
  }, [searchQuery, companies]);

  return (
    <RootLayout>
      <Helmet>
        <meta name="title" content="Are You Ready? 2025 | Registered Companies" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="referrer" content="no-referrer" />
        <title> Are You Ready? 2025 | Registered Companies</title>
        <link rel="bookmark" href="https://areyouready.uom.lk/#timeline" />
        <link rel="bookmark" href="https://areyouready.uom.lk/#sponsors" />
        <link rel="bookmark" href="https://areyouready.uom.lk/#reach_us" />
        <link rel="bookmark" href="https://areyouready.uom.lk/#registrationStatus" />
        <link rel="bookmark" href="https://areyouready.uom.lk/companies" />
      </Helmet>
      <BackToTopButton />
      <FloatingNav navItems={navItms} />

      <div id="registeredCompanies" className="scroll-mt-20 py-8 px-6 text-center dark:bg-gray-800">
        <div className="mb-8 mt-12 md:mt-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-custom-color-800 bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent mb-4">
            Registered Companies
          </h2>
          <p className="mt-4 mx-auto max-w-7xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The following companies have registered for the Are You Ready? 2025 Flagship Career
            Fair.
          </p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {isLoading && (
          <div className="mt-8 p-6 dark:bg-gray-900 rounded-lg borde dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">Loading companies...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 dark:bg-gray-900 rounded-lg borde dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        )}

        {filteredCompanies.length === 0 && !isLoading ? (
          <NoResults />
        ) : (
          <div className="max-w-4xl mx-auto">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.companyId} {...company} />
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  );
}
