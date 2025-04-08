import React from 'react';

const UptimeKumaStatus: React.FC = () => {
    const uptimeKumaURL = "uk1_oeUBG0L3y42kNq51RfB8ZINVq9DtzmaIa3C08t1s";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-3xl p-8 text-center w-full max-w-4xl">
                <h1 className="text-3xl font-extrabold text-blue-800 mb-6">
                    서비스 상태
                </h1>
                <p className="text-gray-700 mb-4">
                    아래에서 Sodanen Bot의 서비스 상태를 확인할 수 있습니다.
                </p>
                <div className="w-full">
                    <iframe
                        src={uptimeKumaURL}
                        title="Uptime Kuma Status"
                        width="100%"
                        height="600px" // 적절한 높이로 조정
                        style={{ border: 'none' }}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Uptime Kuma를 통해 실시간으로 서비스 상태를 모니터링하고 있습니다.
                </p>
            </div>
        </div>
    );
};

export default UptimeKumaStatus;
