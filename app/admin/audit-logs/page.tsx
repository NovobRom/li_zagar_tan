import { getAuditLogs } from '@/app/actions/audit';
import { History, ChevronLeft, Calendar, User, Activity } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
    const logs = await getAuditLogs();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Назад в панель
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <History className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Логи аудита</h1>
                            <p className="text-sm text-gray-500">Последние 100 действий в системе</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Дата</th>
                                <th className="px-6 py-4 font-semibold">Пользователь</th>
                                <th className="px-6 py-4 font-semibold">Действие</th>
                                <th className="px-6 py-4 font-semibold">Сущность</th>
                                <th className="px-6 py-4 font-semibold">Детали</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log: any) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-900">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            {new Date(log.created_at).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <span className="text-xs truncate max-w-[120px]" title={log.user_id}>
                                                {log.user_id?.split('-')[0]}...
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${log.action.includes('DELETE') ? 'bg-red-100 text-red-700' :
                                                log.action.includes('UPLOAD') ? 'bg-green-100 text-green-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-gray-400" />
                                            {log.entity_type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <pre className="text-[10px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 max-w-xs overflow-hidden text-ellipsis">
                                            {JSON.stringify(log.details, null, 2)}
                                        </pre>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Логов пока нет
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
