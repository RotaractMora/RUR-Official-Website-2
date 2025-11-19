import { ICompany } from '@/interfaces/ICompanies';
import Image from 'next/image';
import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';

const CompanyCardHeader = ({
  company,
  isExpanded,
  toggleExpand,
}: {
  company: ICompany;
  isExpanded: boolean;
  toggleExpand: () => void;
}) => (
  <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleExpand}>
    <div className="flex items-center text-left space-x-4">
      <div className="relative h-16 w-28 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={company.logoUrl}
          alt={`${company.name} logo`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{company.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {company.preferredFields.length} departments
          {company.qualitiesToLook &&
            company.qualitiesToLook.length > 0 &&
            ` • ${company.qualitiesToLook.length} qualities`}
          {company.availableJobTypes &&
            company.availableJobTypes.length > 0 &&
            ` • ${company.availableJobTypes.length} job types`}
        </p>
      </div>
    </div>
    <div className="text-gray-500 dark:text-gray-400">
      {isExpanded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      )}
    </div>
  </div>
);

// Company Card Details Component
const CompanyCardDetails = ({
  website,
  description,
  departments,
  qualities,
  availableJobTypes,
}: {
  website: string;
  description: string;
  departments: string[];
  qualities: string[];
  availableJobTypes: string[] | undefined;
}) => (
  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
    <a href={website} target="_blank" className="text-blue-500 dark:text-blue-400 hover:underline">
      {website}
      <LinkIcon className="h-4 w-4 inline-block ml-1" />
    </a>

    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

    <div className="grid md:grid-cols-2 gap-4 mx-2">
      <div>
        <h4 className="font-medium text-left text-gray-900 dark:text-gray-100 mb-2">Departments</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          {departments.map((dept, index) => (
            <li key={index} className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
              {dept}
            </li>
          ))}
        </ul>
      </div>

      {availableJobTypes && availableJobTypes.length > 0 && (
        <div>
          <h4 className="font-medium text-left text-gray-900 dark:text-gray-100 mb-2">Job Types</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {availableJobTypes.map((job, index) => (
              <li key={index} className="flex items-center">
                <span className="h-1.5 w-1.5 text-left rounded-full bg-blue-500 mr-2"></span>
                {job}
              </li>
            ))}
          </ul>
        </div>
      )}

      {qualities && qualities.length > 0 && (
        <div>
          <h4 className="font-medium text-left text-gray-900 dark:text-gray-100 mb-2">Qualities</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {qualities.map((quality, index) => (
              <li key={index} className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2 mt-1"></span>
                <span className="text-left">{quality}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export const CompanyCard = (company: ICompany) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden mb-4 transition-all duration-300 hover:shadow-md">
      <CompanyCardHeader
        company={company}
        isExpanded={isExpanded}
        toggleExpand={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <CompanyCardDetails
          website={company.website}
          description={company.description}
          departments={company.preferredFields}
          availableJobTypes={company.availableJobTypes}
          qualities={company.qualitiesToLook}
        />
      )}

      {company.availableJobTypes && (
        <div style={{ display: 'none' }}>{company.availableJobTypes}</div>
      )}
    </div>
  );
};
