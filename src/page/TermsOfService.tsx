const TermsOfService = () => {
    return (
        <div className="container mx-auto p-6 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative animated-background">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">이용약관</h1>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제1조</span>
                        (목적)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        본 약관은 Sodanen_Bot(이하 "회사"라 합니다)이 제공하고자 하는 서비스(이하 "서비스")를 이용하는 개인(이하 "이용자"또는 "개인")의 정보(이하 "개인정보")를
                        보호하기위해, 개인정보 보호법, 정보통신망 이용촉진 및<br></br>정보보호 등에 관한 법률(이하 "정보통신망법") 등 관련 법령을 준수하고, 서비스 이용자의 개인정보
                        보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침(이하 "본 방침")을 수립합니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제2조</span>
                        (개인정보 처리의 원칙)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수
                        있습니다. 단 법령의 규정 등에 의해 적법하게 강제되는 경우<br></br>회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제 3자에게 제공할 수도 있습니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제3조</span>
                        (본 방침의 공개)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결 화면을 통해 본 방침을 공개하고 있습니다.</li>
                        <li>회사는 제 1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인 할 수 있도록 합니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제4조</span>
                        (본 방침의 변경)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>본 방침은 개인정보 관련 법령, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.</li>
                        <li>
                            회사는 제 1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.
                            <ol className="list-decimal pl-10 mt-2">
                                <li>회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법</li>
                                <li>서비스가 등록된 채널 및 커뮤니티 서버 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법</li>
                            </ol>
                        </li>
                        <li>
                            회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.
                        </li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">
                        <span className="mr-2">제5조</span>
                        (회사 서비스 제공을 위한 정보)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.</p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수집 정보</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">목적</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">사용자의 고유 아이디</td>
                                    <td className="px-4 py-2 whitespace-nowrap">서비스 제공 및 사용자 식별</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">서비스가 설치된 서버의 메시지 로그</td>
                                    <td className="px-4 py-2 whitespace-nowrap">서비스 제공 및 문제 해결</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제6조</span>
                        (서비스 이용 및 부정 이용 확인을 위한 정보)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">회사는 이용자의 서비스 이용에 따른 통계 및 분석을 위하여 다음과 같은 정보를 수집합니다</p>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>서비스 이용기록</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">
                        <span className="mr-2">제7조</span>
                        (기타 수집 정보)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">회사는 아래와 같이 정보를 수집합니다.</p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수집 목적</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수집 정보</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">이용자 식별 및 서비스 제공</td>
                                    <td className="px-4 py-2 whitespace-nowrap">사용자의 고유 아이디, 사용자의 언어, 메시지 기록</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제8조</span>
                        (개인정보 수집 방법)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.</p>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>이용자가 회사의 홈페이지에서 직접 추가하는 방식</li>
                        <li>어플리케이션등 회사가 제공하는 방법 이외 서비스를 통해 이용자가 서비스를 추가하는 방식</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제9조</span>
                        (개인정보의 이용)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">회사는 개인정보를 다음 각 호의 경우에 이용합니다.</p>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>이용문의에 대한 회신, 불만의 처리등 이용자에 대한 서비스 개선을 위한 경우</li>
                        <li>회사의 서비스를 제공하기 위한 경우</li>
                        <li>법령 및 회사 약관을 위반하는 사용자의 대한 이용 제한 조치 및 서비스의 원활한 운영에 지장을 주는 행위의 대한 제제</li>
                        <li>신규 서비스 개발을 위한 경우</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제10조</span>
                        (개인정보의 처리 위탁)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">회사는 원활한 서비스 제공과 효과적인 업무 처리를 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다.</p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수탁업체</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위탁 업무 내용</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위탁 기간</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Amazon Web Services, Inc.</td>
                                    <td className="px-4 py-2 whitespace-nowrap">음성 합성 서비스 (TTS)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">서비스 이용 시 즉시 종료</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">네이버클라우드(주)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">파파고 번역 (Papago)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">서비스 이용 시 즉시 종료</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제12조</span>
                        (개인정보 보유 및 이용기간)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>회사는 이용자의 개인정보에 대해 개인정보의 수집 및 이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.</li>
                        <li>
                            전향에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용 기록은 부정 서비스 이용 및 이용 방지를 위해 서비스 이용 종료 시점으로부터 최대 1개월간
                            보관합니다.
                        </li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제13조</span>
                        (개인정보의 파기 원칙)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유 및 이용기간의 경과 등 개인정보가 필요하지 않은 경우 해당 정보를 지체 없이 파기합니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제14조</span>
                        (개인정보파기 절차)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>이용자가 서비스 이용시 자동으로 입력된 정보는 개인정보 처리 목적이 달성된 후 서비스 종료시 자동으로 파기 되어집니다.</li>
                        <li>회사는 파기 사유가 발생한 개인정보를 책임자의 DB(데이터베이스)를 통해 자동으로 파기 되어집니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제15조</span>
                        (개인정보 조회 및 수집동의 철회)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보 수집 동의 철회를 요청 할 수 있습니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제16조</span>
                        (이용자의 의무)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>이용자는 부정확한 정보 입력으로 인한 문제의 책임은 이용자 자신에게 있습니다.</li>
                        <li>타인의 개인정보를 도용한 경우 이용자 자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제17조</span>
                        (회사의 개인정보 관리)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 아니하도록 안정성을 확보하기 위하여 필요한 기술적 및 관리 보호
                        대책을 강구하고 있습니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제18조</span>
                        (삭제된 정보의 처리)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보를 회사가 수집하는 "개인정보의 파기 원칙"에 명시된 바에 따라 처리하고 있습니다.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제19조</span>
                        (해킹 등에 대비한 대책)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>회사는 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출 되거나 훼손되는걸 막기 위해 최선을 다하고 있습니다.</li>
                        <li>회사는 최신 기술을 이용하여 이용자들의 개인정보 또는 자료가 유출 또는 손상 되지 않도록 방지하고 있습니다.</li>
                        <li>회사는 만읠의 사태에 대비하여 차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.</li>
                        <li>회사는 민감한 개인정보(를 수집 및 보유하고 있는 경우)네트워크 상에서의 개인정보를 안전하게 전송 할 수 있도록 하고 있습니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">
                        <span className="mr-2">제20조</span>
                        (개인정보 유출 등에 대한 조치)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        회사는 개인정보의 분실 및 도난 유출(이하 "유출 등"이라한다) 사실을 안 때에는 다음 각 호의 모든 사항을 해당 이용자에게 알리고 모든 사용자 및 공지사항으로
                        해당사실을 신고합니다.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">알림 내용</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">유출 등이 된 개인정보 항목</td>
                                    <td className="px-4 py-2 whitespace-nowrap">유출된 개인정보의 종류</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">유출 등이 발생한 시점</td>
                                    <td className="px-4 py-2 whitespace-nowrap">유출 발생 시간</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">이용자가 취할 수 있는 조치</td>
                                    <td className="px-4 py-2 whitespace-nowrap">유출에 대응하기 위한 사용자 가이드</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">이용자가 상담 등을 접수 할 수 있는 연락처</td>
                                    <td className="px-4 py-2 whitespace-nowrap">관련 문의 연락처 정보</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제21조</span>
                        (국외 이전 개인정보의 보호)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>회사는 개인정보에 관하여 개인정보보호법 등 관계 법규를 위반하는 사항을 내용으로 하는 국제계약을 체결하지 않습니다.</li>
                        <li>
                            회사는 이용자의 개인정보를 국외에 제공(조회하는 경우를 포함) 및 처리위탁을 하기위해 이용자의 동의를 받지 않습니다. 다만<br></br> 개인정보보호법 등
                            대한민국의 관계 법률에 따라 이용자에게 알린 경우 개인정보 처리위탁 및 보관에 따른 동의 절차를 거치지 아니할 수 있습니다.
                        </li>

                        <li>
                            회사는 서비스 이용을 개시하면서의 동의는 받아 각 호의 모든 사항을 이용자에게 고지합니다.
                            <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                                <li>이전 되는 개인정보 항목</li>
                                <li>개인정보가 이전되는 국가 및 이전일시 및 이전방법</li>
                                <li>개인정보를 이전 받는 자의 고유 아이디 및 메세지지</li>
                            </ol>
                        </li>
                        <li>회사는 본문에 따른 동의를 받아 개인정보를 국외로 이전하는 경우 개인정보보호법 대통령령 등 관계법규에서 정하는 바에 따라 보호조치를 합니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제21조</span>
                        (개인정보 자동 수집 장치의 설치 및 운영 및 거부에 관한 사항)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>회사는 이용자에게 맞춤 서비슬 제공하기위해 이용 정보를 저장하고 수시로 불러오는 개인정보 자동 수집 장치(이하 "서비스")를 사용합니다.</li>
                        <li>이용자는 서비스 설치에 대한 선택권을 가지고 있으며 거부하는 경우 서비스를 사용할 수 없습니다.</li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold  mb-3">
                        <span className="mr-2">제22조</span>
                        (권익침해에 대한 구제방법)
                    </h2>
                    <ol className="list-decimal pl-5 text-gray-700 leading-relaxed">
                        <li>
                            정보주체는 개인정보 침해로 인한 구제를 받기 위하여 대한민국의 국민은 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나
                            상담 등을 신청할 수 있습니다.<br></br>이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시길 바랍니다.
                        </li>
                        <li>
                            회사는 정보주체의 개인정보자기결정권을 보장하고 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며,<br></br>신고나 상담이 필요한 경우 담당
                            관리자로 연락해주시기 바랍니다.
                        </li>
                        <li>
                            개인정보 보호법 제35조(개인정보의 열람), 제36조(개인정보의 정정 및 삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여<br></br>공공기관의
                            장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다
                            <ol className="list-decimal pl-5">
                                <li>가. 중앙행정심판위원회 : (국번없이) 110 www.simpan.go.kr</li>
                            </ol>
                        </li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold  mb-3">부칙</h2>
                    <p className="text-gray-700 leading-relaxed">본 약관은 2025년 4월 12일부터 시행됩니다.</p>
                </div>

                <p className="text-sm  mt-8 text-center">시행일자: 2025년 4월 12일</p>
            </div>
        </div>
    );
};

export default TermsOfService;
