define(function () {
    var data = [
        {// 1
            question: 'Where can you find the Business Plan Center?',
            choices: [
                'Business Financial Solutions Portal',
                'wellsfargo.com',
                'wellsfargoworks.com',
                'SS&D Gateway'
            ],
            answers: [],
            target: 3
        },
        {// 2
            question: 'What does it cost a small business owner to use the Business Plan Center?',
            choices: [
                'Complimentary (no cost) on wellsfargoworks.com for both customers and non-customers',
                '$50/month',
                '$100/month',
                'Free with a Wells Fargo Business Choice Checking account'
            ],
            answers: [],
            target: 1
        },
        {// 3
            question: 'A written business plan is used for a start-up business only (True or False) ',
            choices: [
                'True',
                'False, a business plan should be a living document that can keep owners on track to achieve their business goals and should be adjusted as goals are met and needs change.'
            ],
            answers: [],
            target: 2
        },
        {// 4
            question: 'What business planning tools can be found in the Business Plan Center?',
            choices: [
                'Business plan tool - create/enhance a business plan',
                'A competitive intelligence tool- data on their business, their competition, and the industry',
                'Online learning resources to expand knowledge on business plan essentials',
                'A, B and C'
            ],
            answers: [],
            target: 4
        },
        {// 5
            question: 'Approximately how many business owners have a written business plan?',
            choices: [
                'About 1/3',
                'Almost 1/2',
                'Nearly 3/4'
            ],
            answers: [],
            target: 1
        },
        {// 6
            question: 'How often can business owners update their plan on the business plan center?',
            choices: [
                'As often as needed',
                '2 per year',
                '4 per year',
                '6 per year'
            ],
            answers: [],
            target: 1
        },
        {// 7
            question: 'What data can be found using the “benchmarking” feature of Competitive Intelligence Tool?',
            choices: [
                'Users can assess market conditions in a chosen area and use advanced filters to find the best places to advertise.',
                'Users can create maps and lists of competitors, potential buyers, and vendors within a particular geography.',
                'Users can see how they compare to other businesses near them in areas such as revenue, annual average worker salary, number of employees, and more.',
                'A, B and C'
            ],
            answers: [],
            target: 3
        },
        {// 8
            question: 'What data can be found using the “mapping the competition” feature of Competitive Intelligence Tool?',
            choices: [
                'Users can assess market conditions in a chosen area and use advanced filters to find the best places to advertise.',
                'Users can create maps and lists of competitors, potential buyers, and vendors within a particular geography.',
                'Users can see how they compare to other businesses near them in areas such as revenue, annual average worker salary, number of employees, and more.',
                'A and B only'
            ],
            answers: [],
            target: 2
        },
        {// 9
            question: 'What data can be found using the “advertising” feature of Competitive Intelligence Tool?',
            choices: [
                'Users can assess market conditions in a chosen area and use advanced filters to find the best places to advertise.',
                'Users can create maps and lists of competitors, potential buyers, and vendors within a particular geography.',
                'Users can see how they compare to other businesses near them in areas such as revenue, annual average worker salary, number of employees, and more.',
                'A and C only'
            ],
            answers: [],
            target: 1
        },
        {// 10
            question: 'Who should you share the business plan center with?',
            choices: [
                'Business Customers',
                'Prospects',
                'COIs (suggest spelling out and including an example “Centers of Influence” including accountants, lawyers, tax preparers, etc...)',
                'A, B and C'
            ],
            answers: [],
            target: 4
        },
        {// 11
            question: 'A written business plan may help owners who are seeking funding for their business. (True or False)',
            choices: [
                'True',
                'False'
            ],
            answers: [],
            target: 1
        },
        {// 12
            question: 'Why is a written business plan important?',
            choices: [
                'Serves as a guide for a company’s lifecycle',
                'Helps determine how to spend time and money most effectively',
                'Outlines current and future obstacles the business might face',
                'All the above'
            ],
            answers: [],
            target: 4
        }];
    data.awards = ['rookie', 'rookie', 'rookie', 'rookie', 'rookie', 'rookie', 'master', 'master', 'master', 'ace', 'ace'];
    return data;
});
